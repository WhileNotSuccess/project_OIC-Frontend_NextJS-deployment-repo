"use client";

import { Language } from "@/app/common/types";
import { boardPage } from "@/app/menu";


interface BoardPageButtonProps{
  onWrite : (name : string) => void,
  language : Language,
  name : string
}

export default function BoardPageButton({
  onWrite,
  language,
  name,
} : BoardPageButtonProps){

  return(
    <div className="flex justify-center ml-2">
      <button
        className=" px-2 bg-[#0093EE] text-white"
        onClick={() => onWrite(name)}
      >
        {boardPage[language]?.write}
      </button>
    </div>
  );
}