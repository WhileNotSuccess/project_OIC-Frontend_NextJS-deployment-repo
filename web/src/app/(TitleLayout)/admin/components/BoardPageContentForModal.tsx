"use client";

import { formatDate } from "@/app/common/formatDate";
import { BoardData, Language } from "@/app/common/types";
import { boardPage } from "@/app/menu";



interface BoardPageContentProps {
  language: Language,
  boardData: BoardData[],
  name: string,
  setPostId: (id: number) => void,
  onClose: () => void,
}


export default function BoardPageContentForModal({
  language,
  boardData,
  name,
  setPostId,
  onClose,
}: BoardPageContentProps) {

  return (
    <section className="w-full flex flex-col items-center mb-5">
      <div className="w-full h-16 border-x-0 border-y-2 border-t-[#4171b4] mt-12 flex sm:items-center items-center justify-between">
        {name === "notice" ?
          <div className="w-20">
          </div>
          :
          null
        }
        <div className="w-2/5 font-bold flex justify-center ml-4">
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
      {boardData && boardData.length > 0
        ? boardData.map((item) => (
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

            <div
              onClick={()=>{
                setPostId(+item.id);
                onClose();
              }}
              className="sm:w-2/5 w-3/5 cursor-pointer ml-4 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {item.title}
            </div>
            <div className="sm:w-1/5 sm:flex sm:justify-center sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
              {item.author}
            </div>
            <div className="sm:w-1/5 sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
              {formatDate(item.createdDate)}
            </div>
            <div className="w-1/5 flex sm:justify-center sm:ml-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {formatDate(item.updatedDate)}
            </div>
          </div>
        ))
        : null}
    </section>
  );
}