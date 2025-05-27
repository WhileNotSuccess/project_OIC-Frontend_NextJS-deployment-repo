"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import CorporationModal from "./CorporationModal";
import DeleteModal from "./DeleteModal";

export type Corporation = {
  id: number;
  koreanName: string;
  englishName: string;
  corporationType: string;
  countryId: number;
};

export type Country = {
  id: number;
  name: string;
};

type CorporationResponse = {
  id: number;
  name: string;
  corporationType: string;
}
export default function Institutions() {
  const customFetch = useCustomFetch();
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [activeCorporation, setActiveCorporation] = useState<Corporation | null>(null);
  const [deleteCorporationId, setDeleteCorporationId] = useState<number | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await customFetch("/corporation/countries", { method: "GET" });
        const data = await res.json();
        setCountries(Array.isArray(data.data) ? data.data : []);
      } catch {
        console.error("국가 데이터를 불러오지 못했습니다.");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCorporations = async () => {
      if (!selectedCountryId) return;
      const country = countries.find((c) => c.id === selectedCountryId);
      if (!country) return;

      try {
        const res = await customFetch(`/corporation?country=${country.name}`, { method: "GET" });
        const data = await res.json();
        if (Array.isArray(data.data)) {
          const transformed = data.data.map((item: CorporationResponse) => ({
            id: item.id,
            koreanName: item.name,
            englishName: "",
            corporationType: item.corporationType,
            countryId: selectedCountryId,
          }));
          setCorporations(transformed);
        } else {
          setCorporations([]);
        }
      } catch {
        console.error("기관 데이터를 불러오지 못했습니다.");
      }
    };

    fetchCorporations();
  }, [selectedCountryId, countries]);

  const handleAdd = () => {
    setActiveCorporation({
      id: 0,
      koreanName: "",
      englishName: "",
      corporationType: "",
      countryId: selectedCountryId ?? 0,
    });
  };

  const handleEdit = (corp: Corporation) => {
    setActiveCorporation(corp);
    setActiveMenuId(null);
  };

  const handleDelete = (id: number) => {
    setDeleteCorporationId(id);
    setActiveMenuId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold mr-4">협약기관 관리</h1>

        {selectedCountryId && (
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            기관 추가
          </button>
        )}
      </div>

      <div className="flex justify-center mb-4">
        <select
          value={selectedCountryId ?? ""}
          onChange={(e) => setSelectedCountryId(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm w-60"
        >
          <option value="">국가 선택</option>
          {Array.isArray(countries) &&
            countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {corporations.map((corp) => (
          <div
            key={corp.id}
            className="m-4 w-64 p-4 border rounded-lg shadow-lg bg-white flex flex-col relative"
          >
            <div
              className="cursor-pointer absolute top-3 right-3 text-lg"
              onClick={() =>
                setActiveMenuId((prev) => (prev === corp.id ? null : corp.id))
              }
            >
              ⋮
            </div>

            {activeMenuId === corp.id && (
              <div className="absolute right-3 top-9 w-32 bg-white border rounded shadow-lg z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    onClick={() => handleEdit(corp)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    수정
                  </li>
                  <li
                    onClick={() => handleDelete(corp.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    삭제
                  </li>
                </ul>
              </div>
            )}

            <div className="text-lg font-bold mb-2">{corp.koreanName}</div>
            <div className="text-sm text-gray-600">기관 형태: {corp.corporationType}</div>
          </div>
        ))}
      </div>

      {activeCorporation && (
        <CorporationModal
          data={activeCorporation}
          countries={countries}
          onClose={() => setActiveCorporation(null)}
        />
      )}

      {deleteCorporationId !== null && (
        <DeleteModal
          id={deleteCorporationId}
          target="corporation/corporation"
          onClose={() => setDeleteCorporationId(null)}
        />
      )}
    </div>
  );
}
