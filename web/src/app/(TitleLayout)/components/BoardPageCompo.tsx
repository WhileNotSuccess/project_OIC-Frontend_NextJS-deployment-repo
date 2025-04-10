"use client";

import useCustomFetch from "@/app/lib/customFetch";
import { boardMenu } from "../../menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { boardPage, getError } from "../../menu";
import Cookies from "js-cookie";
import { Language, AllBoardData } from "@/app/common/types";
import { formatDate } from "@/app/common/formatDate";
import { useRouter } from "next/navigation";
import { useCheckAdmin } from "@/app/lib/canEditOrDelete";

type BoardPageProps = {
  name: keyof (typeof boardMenu)[Language];
};

// 제목, 검색기능, 게시글목록, 페이지네이션은 각 컴포넌트로 분리 ( 유지보수 용이 )

export default function BoardPageCompo({ name }: BoardPageProps) {
  const customFetch = useCustomFetch();
  const [searchOption, setSearchOption] = useState<string>("title");
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>(Language.korean);
  const { adminUserCheck } = useCheckAdmin();
  const [allBoardData, setAllBoardData] = useState<AllBoardData>({
    boardData : [],
    currentPage : 0,
    nextPage : 1,
    prevPage : 1,
    totalPage : 1,
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
          `/posts/${name}?limit=10&page=${currentPage}`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        setAllBoardData({
          boardData : data.data,
          currentPage : data.currentPage,
          nextPage : data.nextPage,
          prevPage : data.prevPage,
          totalPage : data.totalPage,
        });
      } catch {
        alert(getError[language]?.boardError);
        console.error(getError[language]?.boardError);
      }
    };
    fetchBoard(allBoardData.currentPage);
  }, [allBoardData.currentPage, language,name]);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= allBoardData.totalPage) {
      setAllBoardData((prevData)=>({
        ...prevData,
        currentPage:page,
      }));
    }
  };

  const onWrite = (category: string) => {
    router.push(`/post/${category}`);
  };

  const onSearch = async (value: string) => {
    if(!value){
      alert(boardPage[language].writeSomething);
      window.location.reload();
    }
    try {
      const response = await customFetch(
        `/posts/search?limit=10&page=1&category=${name}&${searchOption}=${value}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setAllBoardData({
        boardData : data.data,
        currentPage : data.currentPage,
        nextPage : data.nextPage,
        prevPage : data.prevPage,
        totalPage : data.totalPage,
      });
    } catch {
      alert("테스트 실패");
    }
  };

  return (
    <div className="w-full px-12">
      <header
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
      </header>
      <section className="w-full flex sm:px-40 px-20">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between justify-start">
          <div className="flex sm:flex-row sm:justify-evenly flex-col justify-evenly">
            <select
              className="w-28 h-8 border-2 border-black rounded"
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="title">{boardPage[language]?.title}</option>
              <option value="content">{boardPage[language]?.content}</option>
              <option value="author">{boardPage[language]?.author}</option>
            </select>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              className="w-60 h-8 border-2 border-black rounded pl-2 sm:ml-2"
              placeholder={`${boardPage[language]?.writeTitle}`}
            ></input>
            <button
              onClick={() => onSearch(inputValue)}
              className=" px-2 bg-[#0093EE] text-white sm:ml-2 max-w-20"
            >
              {boardPage[language]?.search}
            </button>
          </div>
          <div className="flex justify-center ml-2">
            {adminUserCheck ? (
              <button
                className=" px-2 bg-[#0093EE] text-white"
                onClick={() => onWrite(name)}
              >
                {boardPage[language]?.write}
              </button>
            ) : null}
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center mb-5">
        <div className="w-full h-16 border-x-0 border-y-2 border-t-[#4171b4] mt-12 flex sm:items-center items-center justify-between">
          <div className="w-2/5 font-bold flex justify-center">
            {boardPage[language]?.title}
          </div>
          <div className="sm:w-1/5 sm:font-bold sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
            {boardPage[language]?.author}
          </div>
          <div className="sm:w-1/5 sm:font-bold sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
            {boardPage[language]?.createDate}
          </div>
          <div className="w-1/5 font-bold flex justify-center sm:ml-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {boardPage[language]?.updateDate}
          </div>
        </div>
        {allBoardData.boardData && allBoardData.boardData.length > 0
          ? allBoardData.boardData.map((item) => (
            <div
              key={item.id}
              className="w-full h-12 border-b-2 border-[#e5e7eb] flex justify-between items-center sm:items-center"
            >
              {name === "notice" ? (
                <div className="w-20 border rounded-sm flex justify-center items-center text-white bg-[#0093EE] font-semibold">
                  {boardPage[language]?.notice}
                </div>
              ) : (
                <div className="sm:w-20 hidden"></div>
              )}

              <Link
                href={`/board/${name}/${item.id}`}
                className="sm:w-2/5 w-3/5 cursor-pointer ml-4 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item.title}
              </Link>
              <div className="sm:w-1/5 sm:flex sm:justify-center sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
                {item.author}
              </div>
              <div className="sm:w-1/5 sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
                {formatDate(item.createdDate)}
              </div>
              <div className="w-1/5 flex justify-center sm:ml-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {formatDate(item.updatedDate)}
              </div>
            </div>
          ))
          : null}
      </section>
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
