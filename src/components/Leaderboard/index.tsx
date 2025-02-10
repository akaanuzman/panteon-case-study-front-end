"use client";

import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Image from 'next/image';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  createColumnHelper,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import * as S from './styles';

interface LeaderboardData {
  id: number;
  ranking: number;
  playerName: string;
  country: string;
  countryFlag: string;
  money: number;
}

const defaultData: LeaderboardData[] = [
  { id: 1, ranking: 1, playerName: "JohnDoe", country: "Japan", countryFlag: "/flags/jp.svg", money: 500 },
  { id: 2, ranking: 2, playerName: "JohnDoe", country: "Sweeden", countryFlag: "/flags/se.svg", money: 750 },
  { id: 3, ranking: 3, playerName: "JohnDoe", country: "U.S.A", countryFlag: "/flags/us.svg", money: 1000 },
  { id: 4, ranking: 4, playerName: "JohnDoe", country: "Turkey", countryFlag: "/flags/tr.svg", money: 10 },
  { id: 5, ranking: 5, playerName: "JohnDoe", country: "Bulgaria", countryFlag: "/flags/bg.svg", money: 40 },
  { id: 6, ranking: 6, playerName: "JohnDoe", country: "Greek", countryFlag: "/flags/gr.svg", money: 2000 },
  { id: 7, ranking: 7, playerName: "JohnDoe", country: "France", countryFlag: "/flags/fr.svg", money: 4000 },
  { id: 8, ranking: 8, playerName: "JohnDoe", country: "Finland", countryFlag: "/flags/fi.svg", money: 250 },
  { id: 9, ranking: 9, playerName: "JohnDoe", country: "Spain", countryFlag: "/flags/es.svg", money: 640 },
  { id: 10, ranking: 10, playerName: "JohnDoe", country: "Germany", countryFlag: "/flags/de.svg", money: 800 },
];

const columnHelper = createColumnHelper<LeaderboardData>();

const defaultColumns = [
  columnHelper.accessor('ranking', {
    id: 'ranking',
    header: 'Ranking',
    cell: info => (
      <S.RankingNumber>
        {info.getValue()}
      </S.RankingNumber>
    ),
  }),
  columnHelper.accessor('playerName', {
    id: 'playerName',
    header: 'Player Name',
    cell: info => (
      <S.PlayerName>
        {info.getValue()}
      </S.PlayerName>
    ),
  }),
  columnHelper.accessor('country', {
    id: 'country',
    header: 'Country',
    cell: info => (
      <S.CountryContainer>
        <Image
          src={info.row.original.countryFlag}
          alt={`${info.getValue()} flag`}
          width={24}
          height={24}
          className="country-flag"
        />
        <S.CountryCode>
          {info.getValue() === "U.S.A" ? "US" : 
           info.getValue() === "Sweeden" ? "SE" :
           info.getValue() === "Finland" ? "FI" :
           info.getValue() === "Greek" ? "GR" :
           info.getValue() === "Japan" ? "JP" :
           info.getValue() === "Turkey" ? "TR" :
           info.getValue() === "Bulgaria" ? "BG" :
           info.getValue() === "France" ? "FR" :
           info.getValue() === "Spain" ? "ES" :
           info.getValue() === "Germany" ? "DE" : 
           info.getValue().substring(0, 2).toUpperCase()}
        </S.CountryCode>
      </S.CountryContainer>
    ),
  }),
  columnHelper.accessor('money', {
    id: 'money',
    header: 'Money',
    cell: info => (
      <S.MoneyValue>
        {info.getValue()}
      </S.MoneyValue>
    ),
  }),
];

export const Leaderboard = () => {
  const [data] = useState(defaultData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    defaultColumns.map(column => (column.id as string))
  );

  const [columns] = useState(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      globalFilter,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const moveColumn = (draggedColumnId: string, targetColumnId: string) => {
    const newColumnOrder = [...columnOrder];
    const draggedIndex = newColumnOrder.indexOf(draggedColumnId);
    const targetIndex = newColumnOrder.indexOf(targetColumnId);
    newColumnOrder.splice(draggedIndex, 1);
    newColumnOrder.splice(targetIndex, 0, draggedColumnId);
    setColumnOrder(newColumnOrder);
  };

  return (
    <S.LeaderboardContainer>
      <S.Title>Leaderboard</S.Title>
      
      <S.SearchContainer>
        <S.SearchInput>
          <S.SearchIcon />
          <Input
            placeholder="Search"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </S.SearchInput>
        <S.FilterButton>
          <FilterOutlined style={{ fontSize: '20px', color: 'white' }} />
        </S.FilterButton>
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