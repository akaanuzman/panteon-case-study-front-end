import styled from 'styled-components';
import Image from 'next/image';

export const LayoutContainer = styled.div`
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #17151f;
`;

export const LogoImage = styled(Image)`
  width: 180px !important;
  height: 40px !important;
  object-fit: contain;
`;

export const Content = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;