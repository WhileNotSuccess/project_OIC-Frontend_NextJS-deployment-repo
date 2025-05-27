import { PrideGlobal } from "@/app/common/types";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  method: string;
  data?: PrideGlobal;
};

type Mapping = {
  [key: string]: string;
};

export default function PrideModal({ onClose, data, method }: ModalProps) {
  const keyMapping: Mapping = {
    korean: "한국어 설명",
    english: "영어 설명",
    japanese: "일본어 설명",
  };

  const [preview, setPreview] = useState<string | StaticImport>("");
  const [inputs, setInputs] = useState(
    data
      ? {
        korean: data.korean,
        english: data.english,
        japanese: data.japanese,
      }
      : {
        korean: "",
        english: "",
        japanese: "",
      },
  );
  const [image, setImage] = useState<File>();
  const customFetch = useCustomFormFetch();

  const onSubmit = async () => {
    const formData = new FormData();

    // 텍스트 입력 필드 append
    for (const [key, value] of Object.entries(inputs)) {
      formData.append(key, value);
    }

    // 이미지 append (POST 시 필수, PUT은 생략 가능)
    if (image) {
      formData.append("file", image);
    } else if (method === "POST") {
      alert("이미지를 선택해주세요.");
      return;
    }

    const response = await customFetch(
      method === "POST" ? "/pride" : `/pride/${data?.id}`,
      {
        method: method,
        body: formData,
      },
    );

    if (response) {
      alert("작성에 성공했습니다.");
      window.location.reload();
    }
  };

  return createPortal(
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg h-200 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        {/* 이미지 업로드 */}
        <div>
          {image && preview ? (
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
                setImage(file);
              }
            }}
            type="file"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* 텍스트 필드 입력 */}
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {keyMapping[key] || key}
            </label>
            <input
              value={value || ""}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, [key]: e.target.value }))
              }
              type="text"
              id={key}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        ))}

        {/* 제출 버튼 */}
        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {method === "POST" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
