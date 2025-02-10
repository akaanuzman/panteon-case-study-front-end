import { ReactNode } from 'react';
import * as S from './styles';
import { Timer } from '../Timer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <S.Header>
        <div /> {/* Empty div for grid layout */}
        <S.LogoContainer>
          <S.LogoImage
            src="/logo.png"
            alt="Panteon Logo"
            width={180}
            height={40}
            priority
          />
        </S.LogoContainer>
        <S.TimerContainer>
          <Timer />
        </S.TimerContainer>
      </S.Header>
      <S.Content>
        {children}
      </S.Content>
    </S.LayoutContainer>
  );
};