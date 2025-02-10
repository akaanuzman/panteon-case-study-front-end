import { ReactNode } from 'react';
import * as S from './styles';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <S.Header>
        <S.LogoImage 
          src="/logo.png" 
          alt="Panteon Logo" 
          width={180} 
          height={40} 
          priority
        />
      </S.Header>
      <S.Content>
        {children}
      </S.Content>
    </S.LayoutContainer>
  );
}; 