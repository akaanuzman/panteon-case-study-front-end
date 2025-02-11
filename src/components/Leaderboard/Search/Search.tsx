import { Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { Suggestion } from '@/types/leaderboard';
import { getCountryFlagPath, getCountryName } from '@/utils/countryUtils';
import * as S from '../styles';
import { useDebounce } from '@/hooks/useDebounce';
import { leaderboardService } from '@/services/leaderboardService';

interface SearchProps {
    onSearch: (suggestion: Suggestion) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const searchInputRef = useRef<InputRef>(null);

    const debouncedSearch = useDebounce(async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            setIsLoadingSuggestions(true);
            const data = await leaderboardService.fetchAutocompleteSuggestions(query);
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
        searchInputRef.current?.input?.blur();
        onSearch(suggestion);
    };

    const handleInputBlur = () => {
        setTimeout(() => setSuggestions([]), 200);
    };

    return (
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
    );
}; 