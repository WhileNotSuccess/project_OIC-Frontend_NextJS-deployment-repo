import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import GlobalProgramsModal from "./GlobalProgramsModal";
import DeleteModal from "./DeleteModal";

type Carousel = {
  id:number,
  image:string,
  koreanPostId:number,
  englishPostId:number,
  japanesePostId:number,
  koreanTitle:string,
  englishTitle:string,
  japaneseTitle:string,
  koreanDescription:string,
  englishDescription:string,
  japaneseDescription:string,
}

export default function GlobalPrograms() {
  const keyMapping: Record<string, string> = {
    koreanPostId: "한국어 포스트",
    englishPostId: "영어 포스트",
    japanesePostId: "일본어 포스트",
    koreanTitle: "한국어 제목",
    englishTitle: "영어 제목",
    japaneseTitle: "일본어 제목",
    koreanDescription: "한국어 설명",
    englishDescription: "영어 설명",
    japaneseDescription: "일본어 설명",
  };

  const customFetch = useCustomFetch();
  const [carousel, setCarousel] = useState<Carousel[]>([]);
  const [carouselPostModal, setCarouselPostModal] = useState<boolean>(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [updateModalId, setUpdateModalId] = useState<number | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  useEffect(()=>{
    const fetchCarousel = async () => {
      try {
        const response = await customFetch("/carousel/raw");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCarousel(data.data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchCarousel();
  },[]);

  return <div className="flex flex-wrap gap-4 p-4">
    
    {
      carouselPostModal && (
        <GlobalProgramsModal
          onClose={() => {
            setCarouselPostModal(false);
          }}
          method="POST"
        />
      )
    }
    <h1 className="text-3xl mb-4 font-bold text-center w-full">
                교직원 소개
      <span className="p-4 text-right">
        <button
          onClick={()=>{
            setCarouselPostModal(true);
          }}
          className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
              
              추가하기
        </button>
      </span>
    </h1>
    {
      carousel.map((item) => (
        <div key={item.id} className="w-120 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
          {updateModalId === item.id && (
            <GlobalProgramsModal
              onClose={() => setUpdateModalId(null)}
              data={item}
              method="PATCH"
            />
          )}
          {deleteModalId === item.id && (
            <DeleteModal
              onClose={() => setDeleteModalId(null)}
              id={item.id}
              target="carousel"
            />
          )}
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${item.image}`} alt={item.koreanTitle} />
          <span
            onClick={() =>
              setActiveMenuId((prev) =>
                prev === item.id ? null : item.id,
              )
            }
            className="float-right cursor-pointer relative"
          >
                ㅤㅤ⋮

            {activeMenuId === item.id && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded shadow-lg z-10">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    onClick={() => setDeleteModalId(item.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                      삭제
                  </li>
                  <li
                    onClick={() => setUpdateModalId(item.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                      수정
                  </li>
                </ul>
              </div>
            )}
          </span>
         
          {
            Object.entries(item).map(([key, value]) => {
              if (key === "id" || key === "image") return null; // id와 image는 제외
              if (key === "koreanPostId" || key === "englishPostId" || key === "japanesePostId") {
                return (
                  <div key={key} className="mt-2">
                    <h3 className="text-blue-500 font-bold">{keyMapping[key]}</h3>
                    <p>
                      <a href={`/board/globalPrograms/${value}`} className="text-blue-600 hover:underline">
                      게시글로 이동
                      </a>
                    </p>
                  </div>
                );
              }
              return (
                <div key={key} className="mt-2">
                  <h3 className="text-blue-500 font-bold">{keyMapping[key]}</h3>
                  <p>{value}</p>
                </div>
              );
            },
            )
          }
        </div>
      ))
    }</div>;
}