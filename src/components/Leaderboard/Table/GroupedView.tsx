import { GroupedData, LeaderboardData } from '@/types/leaderboard';
import { getCountryFlagPath, getCountryName } from '@/utils/countryUtils';
import * as S from '../styles';

interface GroupedViewProps {
    groupedData: GroupedData;
}

export const GroupedView = ({ groupedData }: GroupedViewProps) => {
    return (
        <S.GroupedSection>
            {Object.entries(groupedData).map(([country, players]) => (
                <S.CountryGroup key={country}>
                    <S.CountryHeader>
                        <S.CountryContainer>
                            <S.FlagContainer>
                                <S.CountryFlag
                                    src={getCountryFlagPath(country) || ''}
                                    alt={`${country} flag`}
                                    width={32}
                                    height={32}
                                />
                            </S.FlagContainer>
                            <S.CountryCode>
                                {getCountryName(country)}
                            </S.CountryCode>
                        </S.CountryContainer>
                        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}>
                            {players.length} Players
                        </span>
                    </S.CountryHeader>
                    <S.GroupedPlayers>
                        {players.map(player => (
                            <S.GroupedPlayerRow key={player.id}>
                                <S.RankingNumber>{player.ranking}</S.RankingNumber>
                                <S.PlayerName>{player.playerName}</S.PlayerName>
                                <S.MoneyValue>{player.money}</S.MoneyValue>
                            </S.GroupedPlayerRow>
                        ))}
                    </S.GroupedPlayers>
                </S.CountryGroup>
            ))}
        </S.GroupedSection>
    );
}; 