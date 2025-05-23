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
    <div className="flex sm:flex-row sm:justify-evenly flex-col justify-evenly">
      <select
        className="w-28 h-8 border-2 border-black rounded"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="title">{boardPage[language]?.title}</option>
        <option value="date">{boardPage[language]?.createDate}</option>
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
  );
}