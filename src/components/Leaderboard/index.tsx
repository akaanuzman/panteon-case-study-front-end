"use client";

import { Input, InputRef } from 'antd';  // Add InputRef import
import { FilterOutlined } from '@ant-design/icons';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState, useMemo, useRef } from 'react';
import * as S from './styles';
import { useQuery } from '@tanstack/react-query';
import { Spin, Alert } from 'antd';
import { getCountryName, getCountryFlagPath } from '../../utils/countryUtils';
import { SkeletonTable } from './SkeletonTable';
import { useDebounce } from '@/hooks/useDebounce';

interface LeaderboardData {
  id: number;
  ranking: number;
  playerName: string;
  country: string;
  countryName: string;
  countryFlag?: string;
  money: number;
}

interface PlayerData {
  id: number;
  username: string;
  country: string;
  money: number;
  created_at: string;
  updated_at: string;
}

interface PlayerResponse {
  rank: number;
  player: PlayerData;
}

interface ApiResponse {
  total: number;
  players: PlayerResponse[];
}

interface Suggestion {
  username: string;
  country: string;
}

interface AutocompleteResponse {
  query: string;
  suggestions: Suggestion[];
}

const fetchLeaderboardData = async (): Promise<LeaderboardData[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/leaderboard/top`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log('API Response:', data);

    const mappedData = data.players.map((item) => ({
      id: item.player.id,
      ranking: item.rank,
      playerName: item.player.username,
      country: item.player.country,
      countryName: getCountryName(item.player.country),
      countryFlag: getCountryFlagPath(item.player.country),
      money: item.player.money
    }));

    return mappedData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};

const columnHelper = createColumnHelper<LeaderboardData>();

const defaultColumns = [
  columnHelper.accessor('ranking', {
    id: 'ranking',
    header: ({ column }) => (
      <S.HeaderContent onClick={() => column.toggleSorting()}>
        <span>Ranking</span>
        {column.getIsSorted() === 'asc' && <S.SortIconAsc />}
        {column.getIsSorted() === 'desc' && <S.SortIconDesc />}
        {!column.getIsSorted() && <S.SortIcon />}
      </S.HeaderContent>
    ),
    cell: info => (
      <S.RankingNumber>
        {info.getValue()}
      </S.RankingNumber>
    ),
  }),
  columnHelper.accessor('playerName', {
    id: 'playerName',
    header: ({ column }) => (
      <S.HeaderContent onClick={() => column.toggleSorting()}>
        <span>Player Name</span>
        {column.getIsSorted() === 'asc' && <S.SortIconAsc />}
        {column.getIsSorted() === 'desc' && <S.SortIconDesc />}
        {!column.getIsSorted() && <S.SortIcon />}
      </S.HeaderContent>
    ),
    cell: info => (
      <S.PlayerName>
        {info.getValue()}
      </S.PlayerName>
    ),
  }),
  columnHelper.accessor('country', {
    id: 'country',
    header: ({ column }) => (
      <S.HeaderContent onClick={() => column.toggleSorting()}>
        <span>Country</span>
        {column.getIsSorted() === 'asc' && <S.SortIconAsc />}
        {column.getIsSorted() === 'desc' && <S.SortIconDesc />}
        {!column.getIsSorted() && <S.SortIcon />}
      </S.HeaderContent>
    ),
    cell: info => (
      <S.CountryContainer>
        {info.row.original.countryFlag && (
          <S.FlagContainer>
            <S.CountryFlag
              src={info.row.original.countryFlag || ''}  // Add fallback empty string
              alt={`${info.getValue()} flag`}
              width={24}
              height={24}
              style={{ borderRadius: '50%' }}
            />
          </S.FlagContainer>
        )}
        <S.CountryCode>
          {info.row.original.countryName}
        </S.CountryCode>
      </S.CountryContainer>
    ),
  }),
  columnHelper.accessor('money', {
    id: 'money',
    header: ({ column }) => (
      <S.HeaderContent onClick={() => column.toggleSorting()}>
        <span>Money</span>
        {column.getIsSorted() === 'asc' && <S.SortIconAsc />}
        {column.getIsSorted() === 'desc' && <S.SortIconDesc />}
        {!column.getIsSorted() && <S.SortIcon />}
      </S.HeaderContent>
    ),
    cell: info => (
      <S.MoneyValue>
        {info.getValue()}
      </S.MoneyValue>
    ),
  }),
];

export const Leaderboard = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    defaultColumns.map(column => (column.id as string))
  );

  const { data = [], isLoading, error, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboardData,
  });

  const [columns] = useState(() => [...defaultColumns]);

  const table = useReactTable({
    data: data,
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

  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchInputRef = useRef<InputRef>(null);  // Change ref type to InputRef

  const debouncedSearch = useDebounce(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoadingSuggestions(true);
      const response = await fetch(`http://localhost:3000/api/leaderboard/autocomplete?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: AutocompleteResponse = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchValue(suggestion.username);
    setSuggestions([]);
    searchInputRef.current?.input?.blur();  // Update blur call
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => setSuggestions([]), 200);
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
        <S.SearchInput>
          <S.SearchIcon />
          <Input
            ref={searchInputRef}
            placeholder="Search player"
            value={searchValue}
            onChange={handleSearchChange}
            onBlur={handleInputBlur}
          />
          {suggestions.length > 0 && (
            <S.AutocompleteSuggestions>
              {suggestions.map((suggestion, index) => (
                <S.SuggestionItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span>{suggestion.username}</span>
                  <S.CountryContainer>
                    <S.FlagContainer>
                      <S.CountryFlag
                        src={getCountryFlagPath(suggestion.country) || ''}
                        alt={`${suggestion.country} flag`}
                        width={24}
                        height={24}
                      />
                    </S.FlagContainer>
                    <S.CountryCode>
                      {getCountryName(suggestion.country)}
                    </S.CountryCode>
                  </S.CountryContainer>
                </S.SuggestionItem>
              ))}
            </S.AutocompleteSuggestions>
          )}
          {isLoadingSuggestions && searchValue.length >= 3 && (
            <S.AutocompleteSuggestions>
              {[1, 2, 3].map((_, index) => (
                <S.SuggestionSkeleton key={index}>
                  <div />
                  <div />
                </S.SuggestionSkeleton>
              ))}
            </S.AutocompleteSuggestions>
          )}
        </S.SearchInput>
        <S.GroupButton>
          <S.GroupIcon />
        </S.GroupButton>
      </S.SearchContainer>

      <S.TableContainer>
        <S.TableHeaderContainer>
          <S.TableHeaderRow>
            {table.getHeaderGroups().map(headerGroup => (
              headerGroup.headers.map(header => (
                <S.TableHeader
                  key={header.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', header.id);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const draggedColumnId = e.dataTransfer.getData('text/plain');
                    const targetColumnId = header.id;
                    moveColumn(draggedColumnId, targetColumnId);
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </S.TableHeader>
              ))
            ))}
          </S.TableHeaderRow>
        </S.TableHeaderContainer>

        <S.TableBody>
          {table.getRowModel().rows.map(row => (
            <S.TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <S.TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.TableContainer>
    </S.LeaderboardContainer>
  );
};