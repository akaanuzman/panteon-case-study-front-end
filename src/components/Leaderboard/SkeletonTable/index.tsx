import { Input } from 'antd';
import * as S from '../styles';

export const SkeletonTable = () => {
    return (
        <>
            <S.SearchContainer>
                <S.SearchInput>
                    <S.SearchIcon />
                    <Input placeholder="Search" disabled />
                </S.SearchInput>
                <S.GroupButton disabled>
                    <S.GroupIcon />
                </S.GroupButton>
            </S.SearchContainer>

            <S.TableContainer>
                <S.TableHeaderContainer>
                    <S.TableHeaderRow>
                        <S.TableHeader>Ranking<S.SortIcon /></S.TableHeader>
                        <S.TableHeader>Player Name<S.SortIcon /></S.TableHeader>
                        <S.TableHeader>Country<S.SortIcon /></S.TableHeader>
                        <S.TableHeader>Money<S.SortIcon /></S.TableHeader>
                    </S.TableHeaderRow>
                </S.TableHeaderContainer>

                <S.TableBody>
                    {[...Array(10)].map((_, index) => (
                        <S.SkeletonRow key={index}>
                            <S.SkeletonCell />
                            <S.SkeletonCell />
                            <S.SkeletonCell>
                                <S.CountryContainer>
                                    <S.SkeletonFlag />
                                </S.CountryContainer>
                            </S.SkeletonCell>
                            <S.SkeletonCell />
                        </S.SkeletonRow>
                    ))}
                </S.TableBody>
            </S.TableContainer>
        </>
    );
};
