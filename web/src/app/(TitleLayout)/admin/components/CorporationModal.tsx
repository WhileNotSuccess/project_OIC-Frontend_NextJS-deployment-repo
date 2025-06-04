"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import useCustomFetch from "@/app/hook/customFetch";
import { Country, Corporation } from "./Institutions";

type Props = {
  data: Corporation;
  countries: Country[];
  onClose: () => void;
};

export default function CorporationModal({ data, countries, onClose }: Props) {
  const [inputs, setInputs] = useState({
    koreanName: data.koreanName,
    englishName: data.englishName,
    corporationType: data.corporationType,
    countryId: data.countryId,
  });

  const customFetch = useCustomFetch();

  const onSubmit = async () => {
    try {
      const url =
        data.id === 0 ? "/corporation/corporation" : `/corporation/corporation/${data.id}`;
      const method = data.id === 0 ? "POST" : "PATCH";

      // POST/PATCH 요청 시 필요한 필드만 보내기
      const body = JSON.stringify({
        koreanName: inputs.koreanName,
        englishName: inputs.englishName,
        corporationType: inputs.corporationType,
        countryId: inputs.countryId,
      });

      const res = await customFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (res.ok) {
        alert(data.id === 0 ? "기관이 추가되었습니다." : "기관 정보가 수정되었습니다.");
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
          {data.id === 0 ? "기관 추가" : "기관 정보 수정"}
        </h2>

        <div className="mb-4">
          <label htmlFor="koreanName" className="block mb-1 text-sm font-medium">
            기관명
          </label>
          <input
            id="koreanName"
            type="text"
            value={inputs.koreanName}
            onChange={(e) => setInputs({ ...inputs, koreanName: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="englishName" className="block mb-1 text-sm font-medium">
            영문명
          </label>
          <input
            id="englishName"
            type="text"
            value={inputs.englishName}
            onChange={(e) => setInputs({ ...inputs, englishName: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block mb-1 text-sm font-medium">
            기관 형태
          </label>
          <input
            id="type"
            type="text"
            value={inputs.corporationType}
            onChange={(e) => setInputs({ ...inputs, corporationType: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block mb-1 text-sm font-medium">
            국가 선택
          </label>
          <select
            id="country"
            value={inputs.countryId}
            onChange={(e) => setInputs({ ...inputs, countryId: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">국가 선택</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
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
