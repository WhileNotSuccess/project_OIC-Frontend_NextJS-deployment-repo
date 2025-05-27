import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import PrideModal from "./PrideModal";
type Pride = {
    id: number;
    image: string;
    korean: string;
    english: string;
    japanese: string;
}
export default function PrideOfYJU() {
  const customFetch = useCustomFetch();
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [updateModalId, setUpdateModalId] = useState<number | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [prides, setPrides] = useState<Pride[]>([]);
  const [pridePostModal, setPridePostModal] = useState<boolean>(false);
  useEffect(()=>{
    async function fetchPrides() {
      const response = await customFetch("/pride");
      const data = await response.json();
      setPrides(data.data);
    }
    fetchPrides();
  },[]);


  return <>{
    
    prides.length > 0 ? (

      <div className="flex flex-wrap justify-center">
        {
          pridePostModal && (
            <PrideModal
              onClose={() => {
                setPridePostModal(false);
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
                setPridePostModal(true);
              }}
              className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
          
          추가하기
            </button>
          </span>
        </h1>
        

        {prides.map((pride) => (
          <div key={pride.id} className="m-4 w-1/4 p-4 border rounded-lg shadow-lg flex flex-col">
            {updateModalId === pride.id && (
              <PrideModal
                onClose={() => setUpdateModalId(null)}
                data={pride}
                method="PATCH"
              />
            )}
            {deleteModalId === pride.id && (
              <DeleteModal
                onClose={() => setDeleteModalId(null)}
                id={pride.id}
                target="pride"
              />
            )}
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${pride.image}`} alt={pride.korean} className="w-64 h-64 object-cover rounded-lg"/>
            <div>
              한국어 설명
              <div
                onClick={() =>
                  setActiveMenuId((prev) =>
                    prev === pride.id ? null : pride.id,
                  )
                }
                className="float-right cursor-pointer relative"
              >
                ㅤㅤ⋮
                {activeMenuId === pride.id && (
                  <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-lg z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      <li
                        onClick={() => setDeleteModalId(pride.id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                      삭제
                      </li>
                      <li
                        onClick={() => setUpdateModalId(pride.id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                      수정
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="font-bold pb-3">{pride.korean}</div>
            <div>영어 설명<br /> <div className="font-bold pb-3">{pride.english}</div></div>
            <div>일본어 설명<br /> <div className="font-bold pb-3">{pride.japanese}</div></div>
          </div>
        ))}
      </div>
    ) : (
      <p>프라이드 오브 YJU 데이터가 없습니다.</p>
    )
  }</>;
}