import { Carousel } from "@/app/common/types";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteModGlobalProgramsPostSelectModal from "./GlobalProgramsPostSelectModal";

type ModalProps = {
  onClose: () => void;
  method: string;
  data?: Carousel;
};

type Mapping ={
  [key: string]: string;
}

export default function GlobalProgramsModal({ onClose, data, method }: ModalProps) {
  const keyMapping: Mapping = {
    id: "ID 🆔",
    image: "이미지 🖼️",

    koreanPostId: "게시글 ID (한) 🇰🇷",
    englishPostId: "게시글 ID (영) 🇺🇸",
    japanesePostId: "게시글 ID (일) 🇯🇵",

    koreanTitle: "제목 (한) 📝",
    englishTitle: "제목 (영) 📝",
    japaneseTitle: "제목 (일) 📝",

    koreanDescription: "설명 (한) 📄",
    englishDescription: "설명 (영) 📄",
    japaneseDescription: "설명 (일) 📄",
  };
  const [preview, setPreview] = useState<string | StaticImport>("");
  const [newImage, setNewImage] = useState<File>();
  const [postModal, setPostModal] = useState<boolean>(false);
  const [postTarget, setPostTarget] = useState<"koreanPostId" | "englishPostId" | "japanesePostId">("koreanPostId");
  const [inputs, setInputs] = useState<Carousel>(
    data
      ? data
      : {
        id: 0,
        image: "",
        koreanPostId: 0,
        englishPostId: 0,
        japanesePostId: 0,
        koreanTitle: "",
        englishTitle: "",
        japaneseTitle: "",
        koreanDescription: "",
        englishDescription: "",
        japaneseDescription: "",
      },
  );

  const customFetch = useCustomFormFetch();
  const { id, ...noIdInputs } = inputs;

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("koreanPostId", inputs.koreanPostId.toString());
    formData.append("englishPostId", inputs.englishPostId.toString());
    formData.append("japanesePostId", inputs.japanesePostId.toString());    
    formData.append("koreanTitle", inputs.koreanTitle);
    formData.append("englishTitle", inputs.englishTitle);
    formData.append("japaneseTitle", inputs.japaneseTitle); 
    formData.append("koreanDescription", inputs.koreanDescription);
    formData.append("englishDescription", inputs.englishDescription);
    formData.append("japaneseDescription", inputs.japaneseDescription);
    if(!newImage && method === "POST") {
      alert("이미지를 선택해주세요.");
      return;
    }
    // 이미지가 선택된 경우에만 추가
    if (newImage) formData.append("file", newImage);
    const response = await customFetch(
      method == "POST" ? "/carousel" : `/carousel/${id}`,
      {
        method: method,
        body: formData,
      },
    );

    if (response) {
      alert("작성에 성공했습니다.");
      window.location.href = location.href;
    }
  };

  return createPortal(
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      {postModal && <DeleteModGlobalProgramsPostSelectModal onClose={()=>{setPostModal(false);}} setPostId={(id:number)=>{
        setInputs(
          (prev) => ({ ...prev, [postTarget]: id }),
        ); 
      }}/>}
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg h-200 overflow-auto dark:bg-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <div>
          {newImage && preview ? (
            <Image src={preview} alt="프리뷰" width={200} height={200} unoptimized />
          ) : data ? <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${data.image}`} alt="프리뷰" width={200} height={200} unoptimized/> : null}
                  
          <input
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  if (typeof fileReader.result === "string") {
                    setPreview(fileReader.result);
                  }
                };
                fileReader.readAsDataURL(file);
                setNewImage(file);
              }
            }}
            type="file"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {
          Object.entries(noIdInputs).map(([key,value])=>{
            if(key === "id" || key === "image" ) return null; // id와 image는 제외
            if(key === "koreanPostId" || key === "englishPostId" || key === "japanesePostId") {    
              return (
                <div key={key} className="mb-4">
                  <button
                    
                    onClick={() => {
                      setPostTarget(key as "koreanPostId" | "englishPostId" | "japanesePostId");
                      setPostModal(true);
                    }}
                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                  게시글 선택하기
                  </button>
                  <div className="dark:text-black">선택된 게시글 아이디: {inputs[key]}</div>
                </div>
                
              
              );  
            }
            return (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  {keyMapping[key] || key}
                </label>
                <input
                  value={value || ""}
                  onChange={(e) => {
                    setInputs((prev) => ({ ...prev, [key]: e.target.value }));
                  }}
                  type="text"
                  id={key}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            );})
        }
        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {method == "POST" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
