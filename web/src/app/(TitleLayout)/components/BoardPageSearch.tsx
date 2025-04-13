"use client";

import { Language } from "@/app/common/types";
import { boardPage } from "@/app/menu";


interface BoardPageSearchProps {
  searchOption : string,
  setSearchOption : React.Dispatch<React.SetStateAction<string>>,
  language : Language,
  inputValue : string,
  setInputValue : React.Dispatch<React.SetStateAction<string>>,
  onSearch : (name : string) => void,
}

export default function BoardPageSearch({
  searchOption,
  setSearchOption,
  language,
  inputValue,
  setInputValue,
  onSearch,
} : BoardPageSearchProps){

  return(
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
  );
}