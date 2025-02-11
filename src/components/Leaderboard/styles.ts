import styled from 'styled-components';
import { SearchOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import Image from 'next/image';

export const LeaderboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Space Grotesk', sans-serif;
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1001;      
`;

export const SearchInput = styled.div`
  flex: 1;
  position: relative;
  background: rgba(20, 20, 40, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover, &:focus-within {
    background: rgba(30, 30, 60, 0.5);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .ant-input {
    height: 48px;
    color: white;
    padding: 0 1rem;
    font-size: 1rem;
    width: 100%;
    background: transparent !important;
    font-family: 'Space Grotesk', sans-serif;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-family: 'Space Grotesk', sans-serif;
    }
  }
`;

export const SearchIcon = styled(SearchOutlined)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25rem;
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 20px;
`;

export const GroupButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: ${props => props.$isActive ? '#6C5DD3' : '#2D2D3B'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#808191'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  margin-left: 16px;

  &:hover {
    background: ${props => props.$isActive ? '#5B4EC7' : '#363645'};
  }
`;

export const GroupIcon = styled(HiSquare3Stack3D)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.5rem;
  transition: all 0.2s ease;

  ${GroupButton}:hover & {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const TableContainer = styled.div`
  background: transparent;
  overflow: hidden;
  position: relative;  // Eklendi
  z-index: 1000;      // Eklendi: autocomplete'in altında kalması için
`;

export const TableHeaderContainer = styled.div`
  background: rgba(20, 20, 40, 0.5);
  border-radius: 12px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`;

export const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  padding: 1rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
`;

export const TableHeader = styled.div`
  padding: 0 1.5rem;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-child {
    padding-left: 2rem;
  }

  &:last-child {
    padding-right: 2rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const SortIcon = styled(BsThreeDotsVertical)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  margin-left: auto;
`;

export const SortIconAsc = styled(CaretUpOutlined)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  margin-left: auto;
`;

export const SortIconDesc = styled(CaretDownOutlined)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  margin-left: auto;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PlayerName = styled.span`
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
`;

export const CountryCode = styled.span`
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
`;

export const RankingNumber = styled.span`
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
`;

export const TableRow = styled.div<{ isSeparator?: boolean, isHighlighted?: boolean }>`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  padding: 1rem 0;
  background: rgba(20, 20, 40, 0.5);
  transition: all 0.2s ease;
  position: relative;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  clip-path: polygon(
    45px 0,                   
    100% 0,                    
    100% calc(100% - 30px),    
    calc(100% - 45px) 100%,    
    0 100%,                    
    0 30px                    
  );

  &:hover {
    background: rgba(30, 30, 60, 0.5);

    ${PlayerName}, ${CountryCode}, ${RankingNumber} {
      color: #8364e8;
    }
  }

  ${props => props.isSeparator && `
    height: 40px;
    background: rgba(20, 20, 40, 0.5);
    justify-content: center;
    
    ${TableCell} {
      font-style: italic;
      color: rgba(255, 255, 255, 0.5);
    }
  `}

  ${props => props.isHighlighted && `
    background: rgba(131, 100, 232, 0.1);
    
    &:hover {
      background: rgba(131, 100, 232, 0.15);
    }
  `}
`;

export const TableCell = styled.div`
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:first-child {
    padding-left: 2rem;
  }

  &:last-child {
    padding-right: 2rem;
    justify-content: center;
  }
`;

export const CountryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const FlagContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
`;

export const CountryFlag = styled(Image)`
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
`;

export const SkeletonRow = styled(TableRow)`
  opacity: 0.5;
  pointer-events: none;
`;

export const SkeletonCell = styled(TableCell)`
  &::after {
    content: "";
    display: block;
    width: 60%;
    height: 20px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.2) 37%,
      rgba(255, 255, 255, 0.1) 63%
    );
    border-radius: 4px;
    animation: loading 1.4s ease infinite;
  }

  @keyframes loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export const SkeletonFlag = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 0.75rem;
`;

export const MoneyValue = styled.span`
  color: #8364e8;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
`;

export const AutocompleteSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(20, 20, 40, 0.95);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 1001;
`;

export const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(131, 100, 232, 0.1);
  }

  > ${CountryContainer} {
    margin-left: auto;
  }
`;

export const SuggestionSkeleton = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  > div {
    height: 20px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.2) 37%,
      rgba(255, 255, 255, 0.1) 63%
    );
    border-radius: 4px;
    animation: loading 1.4s ease infinite;
  }

  > div:first-child {
    width: 200px;
  }

  > div:last-child {
    width: 100px;
  }
`;

export const GroupedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CountryGroup = styled.div`
  background: rgba(20, 20, 40, 0.5);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

export const CountryHeader = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(131, 100, 232, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  ${CountryContainer} {
    gap: 1rem;
  }

  ${CountryFlag} {
    width: 32px !important;
    height: 32px !important;
  }

  ${CountryCode} {
    font-size: 1.25rem;
  }
`;

export const GroupedPlayers = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupedPlayerRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  padding: 0.75rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(131, 100, 232, 0.05);
  }
`;

export const GroupedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
`;

export const CountrySection = styled.div`
  background: #1F1F2C;
  border-radius: 16px;
  overflow: hidden;
`;

export const CountryName = styled.h3`
  margin: 0;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
`;