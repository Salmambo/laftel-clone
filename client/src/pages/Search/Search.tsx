import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import notfound from "@/../public/assets/svgs/notfound.svg";
import { getSearchAnimes } from "@/apis";
import { SubCarouselCells } from "@/components";
import { useFixScroll, useFooterToggle, useNewTitle } from "@/hooks";
import * as S from "@/pages/Search/styled";
import { SearchQuery } from "@/types/search";

export function Search() {
  const { searchText } = useParams();
  useNewTitle(`'${searchText}'에 대한 검색 결과 | 라프텔`);
  useFooterToggle();
  useFixScroll();

  const { data: search, isError } = useQuery<SearchQuery, AxiosError>({
    queryKey: ["search", searchText],
    queryFn: async () => {
      const { data, status } = await getSearchAnimes(searchText as string);
      return { data, status };
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    // 스테이터스 202번
    return (
      <S.Container>
        <S.Wrapper>
          <S.TitleWrapper>
            <S.Title>{`‘${searchText}’`}</S.Title>
            &nbsp;검색 결과
          </S.TitleWrapper>
          <S.NotFound>
            <img src={notfound} alt='검색 결과가 없어요.' />
            <S.Desc>앗! 원하시는 검색 결과가 없어요.</S.Desc>
          </S.NotFound>
        </S.Wrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>{`‘${searchText}’`}</S.Title>
          &nbsp;검색 결과
        </S.TitleWrapper>
        <S.AnimesContainer>
          <SubCarouselCells animes={search?.data} isSearch />
        </S.AnimesContainer>
      </S.Wrapper>
    </S.Container>
  );
}