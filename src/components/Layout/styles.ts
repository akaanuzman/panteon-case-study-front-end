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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const LogoContainer = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    grid-column: 1;
    order: 1;
  }
`;

export const LogoImage = styled(Image)`
  width: 180px !important;
  height: 40px !important;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 150px !important;
    height: 35px !important;
  }
`;

export const TimerContainer = styled.div`
  grid-column: 3;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    grid-column: 1;
    order: 2;
    justify-content: center;
  }
`;

export const Content = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;