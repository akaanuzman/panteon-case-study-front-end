import { Table } from '@tanstack/react-table';
import { LeaderboardData } from '@/types/leaderboard';
import * as S from '../styles';
import { flexRender } from '@tanstack/react-table';

interface TableViewProps {
    table: Table<LeaderboardData>;
    searchValue: string;
    moveColumn: (draggedColumnId: string, targetColumnId: string) => void;
}

export const TableView = ({ table, searchValue, moveColumn }: TableViewProps) => {
    return (
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
                    <S.TableRow
                        key={row.id}
                        isSeparator={row.original.id === -1}
                        isHighlighted={row.original.playerName === searchValue}
                    >
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
    );
}; 