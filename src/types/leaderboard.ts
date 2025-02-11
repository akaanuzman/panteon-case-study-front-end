export interface LeaderboardData {
    id: number;
    ranking: number;
    playerName: string;
    country: string;
    countryName: string;
    countryFlag?: string;
    money: number;
}

export interface PlayerData {
    id: number;
    username: string;
    country: string;
    money: number;
    created_at: string;
    updated_at: string;
}

export interface PlayerResponse {
    rank: number;
    player: PlayerData;
}

export interface ApiResponse {
    total: number;
    players: PlayerResponse[];
}

export interface Suggestion {
    username: string;
    country: string;
}

export interface AutocompleteResponse {
    query: string;
    suggestions: Suggestion[];
}

export interface SearchResponse {
    topPlayers: ApiResponse;
    surroundingPlayers: ApiResponse;
}

export interface GroupedData {
    [country: string]: LeaderboardData[];
}
