"use client";

import { AllBoardData, Language } from "@/app/common/types";
import { boardPage } from "@/app/menu";
import { useState } from "react";


interface BoardPageSearchProps {
  language : Language,
  customFetch : (endpoint : string, options? : RequestInit) => Promise<Response>,
  setAllBoardData : React.Dispatch<React.SetStateAction<AllBoardData>>,
  name : string,
}

export default function BoardPageSearch({
  language,
  customFetch,
  setAllBoardData,
  name,
} : BoardPageSearchProps){
  const [searchOption, setSearchOption] = useState<string>("title");
  const [inputValue, setInputValue] = useState("");


  const onSearch = async (value: string) => {
    if (!value) {
      alert(boardPage[language].writeSomething);
      window.location.reload();
    }
    try {
      console.log(`/post/search?limit=10&page=1&category=${name}&target=${searchOption}&word=${value}`);
      const response = await customFetch(
        `/post/search?limit=10&page=1&category=${name}&target=${searchOption}&word=${value}`,
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
      alert("테스트 실패");
    }
  };

  return(
    <div className="w-full xl:w-full flex flex-wrap sm:flex-nowrap gap-2 border-2 border-black p-2">
      <select
        className="rounded w-full sm:w-auto"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="title">{boardPage[language]?.title}</option>
        <option value="date">{boardPage[language]?.createDate}</option>
        <option value="author">{boardPage[language]?.author}</option>
      </select>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded w-full flex-1"
        placeholder={`${boardPage[language]?.writeTitle}`}
      ></input>
      <button
        onClick={() => onSearch(inputValue)}
        className="bg-[#0093EE] text-white whitespace-nowrap px-2 w-full sm:w-auto"
      >
        {boardPage[language]?.search}
      </button>
    </div>
  );
}