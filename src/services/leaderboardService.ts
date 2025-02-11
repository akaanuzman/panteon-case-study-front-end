import { ApiResponse, AutocompleteResponse, LeaderboardData, SearchResponse } from '@/types/leaderboard';
import { getCountryName, getCountryFlagPath } from '@/utils/countryUtils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const leaderboardService = {
    async fetchLeaderboardData(): Promise<LeaderboardData[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/leaderboard/top`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            return data.players.map((item) => ({
                id: item.player.id,
                ranking: item.rank,
                playerName: item.player.username,
                country: item.player.country,
                countryName: getCountryName(item.player.country),
                countryFlag: getCountryFlagPath(item.player.country),
                money: item.player.money
            }));
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            throw error;
        }
    },

    async fetchSearchResults(username: string): Promise<LeaderboardData[]> {
        try {
            const response = await fetch(
                `${API_BASE_URL}/leaderboard/search?username=${encodeURIComponent(username)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SearchResponse = await response.json();

            const allPlayers = [...data.topPlayers.players, ...data.surroundingPlayers.players];
            const sortedPlayers = allPlayers.sort((a, b) => a.rank - b.rank);
            const uniquePlayers = Array.from(
                new Map(sortedPlayers.map(item => [item.player.id, item])).values()
            );

            return uniquePlayers.map((item) => ({
                id: item.player.id,
                ranking: item.rank,
                playerName: item.player.username,
                country: item.player.country,
                countryName: getCountryName(item.player.country),
                countryFlag: getCountryFlagPath(item.player.country),
                money: item.player.money
            }));
        } catch (error) {
            console.error('Error fetching search results:', error);
            throw error;
        }
    },

    async fetchAutocompleteSuggestions(query: string): Promise<AutocompleteResponse> {
        try {
            const response = await fetch(
                `${API_BASE_URL}/leaderboard/autocomplete?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            throw error;
        }
    }
}; 