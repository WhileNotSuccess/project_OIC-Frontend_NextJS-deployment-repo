"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import CountriesModal from "./CountriesModal";
import DeleteModal from "./DeleteModal";

type Country = {
  id: number;
  name: string;
  x: number;
  y: number;
  englishName?: string;
  japaneseName?: string;
};
type CountryResponse = {
  id: number;
  name: string;
  x: number;
  y: number;
  englishName: string;
  japaneseName: string;
};

export default function Countries() {
  const customFetch = useCustomFetch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [activeCountry, setActiveCountry] = useState<Country | null>(null);
  const [deleteCountryId, setDeleteCountryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await customFetch("/corporation/countries", { method: "GET" });
        const data = await res.json();
        if (Array.isArray(data.data)) {
          const transformed = data.data.map((item: CountryResponse) => ({
            id: item.id,
            name: item.name,
            x: item.x,
            y: item.y,
            englishName: item.englishName,
            japaneseName: item.japaneseName,
          }));
          setCountries(transformed);
        } else {
          setCountries([]);
        }
      } catch {
        console.error("국가 데이터를 불러오지 못했습니다.");
      }
    };

    fetchCountries();
  }, []);

  const handleEdit = (country: Country) => {
    setActiveCountry(country);
    setActiveMenuId(null);
  };

  const handleDelete = (id: number) => {
    setDeleteCountryId(id);
    setActiveMenuId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold mr-4">국가 목록</h1>
        <button
          onClick={() =>
            setActiveCountry({
              id: 0,
              name: "",
              englishName: "",
              japaneseName: "",
              x: 0,
              y: 0,
            })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          국가 추가
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {countries.map((country) => (
          <div
            key={country.id}
            className="m-4 w-64 p-4 border rounded-lg shadow-lg bg-white flex flex-col relative"
          >
            <div
              className="cursor-pointer absolute top-3 right-3 text-lg"
              onClick={() =>
                setActiveMenuId((prev) => (prev === country.id ? null : country.id))
              }
            >
              ⋮
            </div>

            {activeMenuId === country.id && (
              <div className="absolute right-3 top-9 w-32 bg-white border rounded shadow-lg z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    onClick={() => handleEdit(country)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    수정
                  </li>
                  <li
                    onClick={() => handleDelete(country.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    삭제
                  </li>
                </ul>
              </div>
            )}

            <div className="text-lg font-bold mb-2">{country.name}</div>
            <div className="text-sm text-gray-800 mt-2">X: {country.x}</div>
            <div className="text-sm text-gray-800">Y: {country.y}</div>
          </div>
        ))}
      </div>

      {activeCountry && (
        <CountriesModal data={activeCountry} onClose={() => setActiveCountry(null)} />
      )}

      {deleteCountryId !== null && (
        <DeleteModal
          id={deleteCountryId}
          target="corporation/country"
          onClose={() => setDeleteCountryId(null)}
        />
      )}
    </div>
  );
}
