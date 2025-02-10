import styled from 'styled-components';
import Image from 'next/image';

export const LayoutContainer = styled.div`
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: #17151f;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const LogoContainer = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: center;
`;

export const LogoImage = styled(Image)`
  width: 180px !important;
  height: 40px !important;
  object-fit: contain;
`;

export const TimerContainer = styled.div`
  grid-column: 3;
  display: flex;
  justify-content: flex-end;
`;

export const Content = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;