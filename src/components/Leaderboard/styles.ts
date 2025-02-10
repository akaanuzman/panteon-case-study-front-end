import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiSquare3Stack3D } from 'react-icons/hi2';

export const LeaderboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
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

export const GroupButton = styled.button`
  width: 48px;
  height: 48px;
  background: rgba(20, 20, 40, 0.5);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(30, 30, 60, 0.5);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
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
  font-weight: 500;
`;

export const TableHeader = styled.div`
  padding: 0 1.5rem;
  cursor: move;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-child {
    padding-left: 2rem;
  }

  &:last-child {
    padding-right: 2rem;
    text-align: right;
  }
`;

export const SortIcon = styled(BsThreeDotsVertical)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
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
`;

export const CountryCode = styled.span`
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;
`;

export const RankingNumber = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  padding: 1.25rem 0;
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
    justify-content: flex-end;
  }
`;

export const CountryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CountryFlag = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const MoneyValue = styled.span`
  color: #8364e8;
  font-weight: 600;
`; 