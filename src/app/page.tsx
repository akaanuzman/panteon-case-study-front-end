"use client";

import { Layout, Card, Input, Typography, Space } from 'antd';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  createColumnHelper,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import styles from './page.module.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

// Dummy data
const defaultData = [
  { id: 1, ranking: 1, playerName: "ProGamer123", country: "US", money: 150000 },
  { id: 2, ranking: 2, playerName: "GameMaster", country: "GB", money: 120 },
  { id: 3, ranking: 3, playerName: "ElitePlayer", country: "DE", money: 10 },
  { id: 4, ranking: 4, playerName: "TopScore", country: "FR", money: 8000 },
  { id: 5, ranking: 5, playerName: "GameKing", country: "jp", money: 750 },
];

const columnHelper = createColumnHelper<any>();

const defaultColumns = [
  columnHelper.accessor('ranking', {
    id: 'ranking',
    header: 'Ranking',
    cell: info => `#${info.getValue()}`,
  }),
  columnHelper.accessor('playerName', {
    id: 'playerName',
    header: 'Player Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('country', {
    id: 'country',
    header: 'Country',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('money', {
    id: 'money',
    header: 'Prize Money',
    cell: info => info.getValue(),
  }),
];

export default function Home() {
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
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Panteon Leaderboard
        </Title>
      </Header>
      <Content className={styles.content}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
              placeholder="Search players..."
              allowClear
              enterButton
              size="large"
              onChange={(e) => setGlobalFilter(e.target.value)}
            />

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
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
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}