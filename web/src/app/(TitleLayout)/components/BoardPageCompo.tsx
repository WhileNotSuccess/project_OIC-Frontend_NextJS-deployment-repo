"use client";

import useCustomFetch from "@/app/hook/customFetch";
import { boardMenu } from "../../menu";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getError } from "../../menu";
import Cookies from "js-cookie";
import { Language, AllBoardData } from "@/app/common/types";
import { useCheckAdmin } from "@/app/hook/canEditOrDelete";
import BoardPageSearch from "./BoardPageSearch";
import BoardPageButton from "./BoardPageButton";
import BoardPageContent from "./BoardPageContent";

type BoardPageProps = {
  name: keyof (typeof boardMenu)[Language];
};

// 제목, 검색기능, 게시글목록, 페이지네이션은 각 컴포넌트로 분리 ( 유지보수 용이 )

export default function BoardPageCompo({ name }: BoardPageProps) {
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);
  const { adminUserCheck } = useCheckAdmin(undefined,name);
  const [allBoardData, setAllBoardData] = useState<AllBoardData>({
    boardData: [],
    currentPage: 1,
    nextPage: 1,
    prevPage: 0,
    totalPage: 1,
  });

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 게시글 불러오기 함수
  useEffect(() => {
    const fetchBoard = async (currentPage: number) => {
      try {
        const response = await customFetch(
          `/post/${name}?limit=10&page=${currentPage}`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        setAllBoardData({
          boardData: data.data,
          currentPage: data.currentPage,
          nextPage: data.nextPage,
          prevPage: data.prevPage,
          totalPage: data.totalPage,
        });
      } catch {
        alert(getError[language]?.boardError);
        console.error(getError[language]?.boardError);
      }
    };
    fetchBoard(allBoardData.currentPage);
  }, [allBoardData.currentPage, language, name]);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= allBoardData.totalPage) {
      setAllBoardData((prevData) => ({
        ...prevData,
        currentPage: page,
      }));
    }
  };

  return (
    <div className="w-full px-12">
      <header
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
      </header>
      <section className="w-full flex xl:px-40 sm:px-20">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between justify-start sm:items-center">
          <BoardPageSearch
            language={language}
            customFetch={customFetch}
            setAllBoardData={setAllBoardData}
            name={name}
          />
          {adminUserCheck ? (
            <BoardPageButton
              language={language}
              name={name}
            />
          ) : null}
        </div>
      </section>
      <BoardPageContent
        language={language}
        boardData={allBoardData.boardData}
        name={name}
      />
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={allBoardData.currentPage}
          nextPage={allBoardData.nextPage}
          totalPage={allBoardData.totalPage}
          prevPage={allBoardData.prevPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
