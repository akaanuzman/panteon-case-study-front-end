"use client";

import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnOrderState,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { LeaderboardData, GroupedData, Suggestion } from '@/types/leaderboard';
import { leaderboardService } from '@/services/leaderboardService';
import { TableView } from './Table/TableView';
import { SkeletonTable } from './SkeletonTable';
import * as S from './styles';
import { GroupedView } from './Table/GroupedView';
import { getDefaultColumns } from './Columns/Columns';
import { Search } from './Search/Search';

export const Leaderboard = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    getDefaultColumns().map(column => (column.id as string))
  );
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<LeaderboardData[] | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isGrouped, setIsGrouped] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading, error, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: leaderboardService.fetchLeaderboardData,
  });

  const tableData = useMemo(() => {
    if (!searchResults) return data;
    const top100 = searchResults.slice(0, 100);
    const separator = {
      id: -1,
      ranking: -1,
      playerName: "...",
      country: "",
      countryName: "",
      countryFlag: "",
      money: 0
    };
    const remainingPlayers = searchResults.slice(100);
    return remainingPlayers.length > 0
      ? [...top100, separator, ...remainingPlayers]
      : searchResults;
  }, [searchResults, data]);

  const groupedData = useMemo(() => {
    if (!isGrouped || !data) return null;
    return data.reduce((acc: GroupedData, player) => {
      if (!acc[player.country]) {
        acc[player.country] = [];
      }
      acc[player.country].push(player);
      return acc;
    }, {});
  }, [data, isGrouped]);

  const [columns] = useState(() => getDefaultColumns());

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnOrder,
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  const moveColumn = (draggedColumnId: string, targetColumnId: string) => {
    const newColumnOrder = [...columnOrder];
    const draggedIndex = newColumnOrder.indexOf(draggedColumnId);
    const targetIndex = newColumnOrder.indexOf(targetColumnId);
    newColumnOrder.splice(draggedIndex, 1);
    newColumnOrder.splice(targetIndex, 0, draggedColumnId);
    setColumnOrder(newColumnOrder);
  };

  const handleSearch = async (suggestion: Suggestion) => {
    setSearchValue(suggestion.username);
    setIsSearchLoading(true);

    try {
      const results = await leaderboardService.fetchSearchResults(suggestion.username);
      setSearchResults(results);
      setSorting([]);

      const searchedPlayerIndex = results.findIndex(
        player => player.playerName === suggestion.username
      );

      if (searchedPlayerIndex !== -1) {
        const rowHeight = 50;
        const scrollPosition = searchedPlayerIndex * rowHeight;

        setTimeout(() => {
          tableRef.current?.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          setIsSearchLoading(false);
        }, 100);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearchLoading(false);
    }
  };

  const handleGroupClick = () => {
    setIsGrouped(prev => !prev);
  };

  if (isLoading) {
    return (
      <S.LeaderboardContainer>
        <S.Title>Leaderboard</S.Title>
        <SkeletonTable />
      </S.LeaderboardContainer>
    );
  }

  if (isError) {
    console.error('Leaderboard Error:', error);
    return (
      <S.LeaderboardContainer>
        <S.Title>Leaderboard</S.Title>
        <Alert
          message="Error"
          description="Failed to load leaderboard data. Please try again later."
          type="error"
          showIcon
          style={{ margin: '2rem' }}
        />
      </S.LeaderboardContainer>
    );
  }

  return (
    <S.LeaderboardContainer>
      <S.Title>Leaderboard</S.Title>
      <S.SearchContainer>
        <Search onSearch={handleSearch} />
        <S.GroupButton onClick={handleGroupClick} $isActive={isGrouped}>
          <S.GroupIcon />
        </S.GroupButton>
      </S.SearchContainer>

      {isSearchLoading ? (
        <SkeletonTable />
      ) : isGrouped && groupedData ? (
        <GroupedView groupedData={groupedData} />
      ) : (
        <TableView
          table={table}
          searchValue={searchValue}
          moveColumn={moveColumn}
        />
      )}
    </S.LeaderboardContainer>
  );
};