"use client";

import { Language } from "@/app/common/types";
import { boardPage } from "@/app/menu";
import { useRouter } from "next/navigation";


interface BoardPageButtonProps{
  language : Language,
  name : string
}

export default function BoardPageButton({
  language,
  name,
} : BoardPageButtonProps){

  const router = useRouter();

  const onWrite = (category: string) => {
    router.push(`/postPage/${category}`);
  };

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