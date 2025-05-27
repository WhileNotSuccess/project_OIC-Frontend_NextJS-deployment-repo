import useCustomFetch from "@/app/hook/customFetch";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AllBoardData, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { getError } from "@/app/menu";
import BoardPageSearch from "../../components/BoardPageSearch";
import BoardPageButton from "../../components/BoardPageButton";
import Pagination from "../../components/Pagination";
import BoardPageContentForModal from "./BoardPageContentForModal";

type ModalProps = {
  onClose: () => void;
  setPostId: (id:number) => void;
};

export default function DeleteModGlobalProgramsPostSelectModal({ onClose, setPostId }: ModalProps) {
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);
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
          `/post/globalPrograms?limit=10&page=${currentPage}`,
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
  }, [allBoardData.currentPage, language]);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= allBoardData.totalPage) {
      setAllBoardData((prevData) => ({
        ...prevData,
        currentPage: page,
      }));
    }
  };
  return createPortal(
    <div
      id="popup-modal-2"
      tabIndex={-1}
      className="w-full px-12 fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/90"
    >
      <div className="relative w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
      </div>
      <section className="w-full flex flex-col gap-4 xl:px-40 sm:px-20">
        <div className="w-full flex flex-col gap-2">
          <BoardPageSearch
            language={language}
            customFetch={customFetch}
            setAllBoardData={setAllBoardData}
            name={"globalPrograms"}
          />
          <BoardPageButton
            language={language}
            name={"globalPrograms"}
          />
        </div>
      </section>

      <BoardPageContentForModal
        language={language}
        boardData={allBoardData.boardData}
        setPostId={setPostId}
        onClose={onClose}
        name={"globalPrograms"}
      />

      <div className="w-full flex justify-center mt-4">
        <Pagination
          currentPage={allBoardData.currentPage}
          nextPage={allBoardData.nextPage}
          totalPage={allBoardData.totalPage}
          prevPage={allBoardData.prevPage}
          onPageChange={onPageChange}
        />
      </div>

    </div>,
    document.body,
  );
}
