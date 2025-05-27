"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import useCustomFetch from "@/app/hook/customFetch";

type Country = {
  id: number;
  name: string;
  englishName?: string;
  japaneseName?: string;
  x: number;
  y: number;
};

type Props = {
  onClose: () => void;
  data: Country;
};

export default function CountriesModal({ onClose, data }: Props) {
  const [inputs, setInputs] = useState({
    name: data.name,
    englishName: data.englishName ?? "",
    japaneseName: data.japaneseName ?? "",
    x: data.x,
    y: data.y,
  });

  const customFetch = useCustomFetch();

  const onSubmit = async () => {
    try {
      const url = data.id === 0 ? "/corporation/country" : `/corporation/country/${data.id}`;
      const method = data.id === 0 ? "POST" : "PATCH";

      const res = await customFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (res.ok) {
        alert(data.id === 0 ? "국가가 추가되었습니다." : "국가 정보가 수정되었습니다.");
        window.location.reload();
      } else {
        const error = await res.json();
        alert("오류: " + error.message);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">
          {data.id === 0 ? "국가 추가" : "국가 정보 수정"}
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">국가명</label>
          <input
            type="text"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">영문명</label>
          <input
            type="text"
            value={inputs.englishName}
            onChange={(e) => setInputs({ ...inputs, englishName: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">일문명</label>
          <input
            type="text"
            value={inputs.japaneseName}
            onChange={(e) => setInputs({ ...inputs, japaneseName: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">X 좌표</label>
          <input
            type="number"
            value={inputs.x}
            onChange={(e) => setInputs({ ...inputs, x: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Y 좌표</label>
          <input
            type="number"
            value={inputs.y}
            onChange={(e) => setInputs({ ...inputs, y: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            onClick={onSubmit}
            className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-medium"
          >
            {data.id === 0 ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
