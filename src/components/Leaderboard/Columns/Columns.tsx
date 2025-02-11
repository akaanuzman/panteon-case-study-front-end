import { createColumnHelper } from '@tanstack/react-table';
import { LeaderboardData } from '@/types/leaderboard';
import * as S from '../styles';

const ColumnHelper = createColumnHelper<LeaderboardData>();

export const getDefaultColumns = () => [
    ColumnHelper.accessor('ranking', {
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
            info.row.original.id === -1 ? null : (
                <S.RankingNumber>
                    {info.getValue()}
                </S.RankingNumber>
            )
        ),
    }),
    ColumnHelper.accessor('playerName', {
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
    ColumnHelper.accessor('country', {
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
            info.row.original.id === -1 ? null : (
                <S.CountryContainer>
                    {info.row.original.countryFlag && (
                        <S.FlagContainer>
                            <S.CountryFlag
                                src={info.row.original.countryFlag || ''}
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
            )
        ),
    }),
    ColumnHelper.accessor('money', {
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
            info.row.original.id === -1 ? null : (
                <S.MoneyValue>
                    {info.getValue()}
                </S.MoneyValue>
            )
        ),
    }),
]; 