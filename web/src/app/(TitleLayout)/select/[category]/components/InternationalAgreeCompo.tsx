"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useCustomFetch from "@/app/hook/customFetch";
import { internationalAgreeMessage } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function InternationalAgreeCompo() {
  const [countries, setCountries] = useState<
    { id: number; name: string; x: number; y: number }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryAndCorporationCount, setCountryAndCorporationCount] = useState<{
    corporationCount: number;
    countryCount: number;
  }>({ corporationCount: 0, countryCount: 0 });
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [schools, setSchools] = useState<
    { id: number; name: string; corporationType: string }[]
  >([]);
  const [language, setLanguage] = useState<Language>(Language.korean);

  const customFetch = useCustomFetch();

  useEffect(() => {
    const fetchCorporationsAndCountries = async () => {
      try {
        const res = await customFetch("/corporation/count", { method: "GET" });
        const data = await res.json();
        setCountryAndCorporationCount(data.data);
      } catch {
        console.error(internationalAgreeMessage[language].CountryAndPartnerLoadingError);
      }
    };
    fetchCorporationsAndCountries();
  }, []);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const fetchCountries = async () => {
      try {
        const res = await customFetch("/corporation/countries", { method: "GET" });
        const data = await res.json();
        setCountries(data.data);
      } catch {
        console.error(internationalAgreeMessage[language].LoadingError);
      }
    };

    fetchCountries();
  }, [language]);

  useEffect(() => {
    const fetchSchools = async () => {
      if (!selectedCountry) return;

      try {
        const country = countries.find((c) => c.name === selectedCountry);
        if (country) {
          setCoords({ x: country.x, y: country.y });
        }

        const res = await customFetch(`/corporation?country=${selectedCountry}`, {
          method: "GET",
        });
        const data = await res.json();
        setSchools(data.data);
      } catch {
        console.error(internationalAgreeMessage[language].PartnerLoadingError);
      }
    };

    fetchSchools();
  }, [selectedCountry, countries, language]);

  return (
    <div className="w-full px-4">
      {/* 깔끔한 카드형 통계 정보 */}
      <div className="flex justify-center gap-6 mt-6 mb-8">
        <div className="bg-white border border-gray-200 shadow-md rounded-lg px-6 py-4 text-center w-40">
          <p className="text-sm text-gray-600">협약국가 수</p>
          <p className="text-xl font-semibold text-blue-600">{countryAndCorporationCount.countryCount}</p>
        </div>
        <div className="bg-white border border-gray-200 shadow-md rounded-lg px-6 py-4 text-center w-40">
          <p className="text-sm text-gray-600">협약기관 수</p>
          <p className="text-xl font-semibold text-green-600">{countryAndCorporationCount.corporationCount}</p>
        </div>
      </div>

      {/* 국가 선택 */}
      <div className="flex justify-center mb-6">
        <select
          id="countrySelect"
          value={selectedCountry ?? ""}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-60"
        >
          <option value="">{internationalAgreeMessage[language].CountrySelect}</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* SVG 지도 + 툴팁 */}
      <svg
        viewBox="0 0 1600 900"
        className="w-full h-auto max-w-[1000px] mx-auto mt-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href="/images/world.png" width="1600" height="900" />

        {selectedCountry && coords && schools.length > 0 && (
          <>
            <foreignObject
              x={coords.x - 20}
              y={coords.y - 40}
              width="40"
              height="40"
              className="overflow-visible"
            >
              <Image
                src="/images/locationIcon.png"
                alt="location"
                width={40}
                height={40}
                className="w-full h-full animate-bounce"
                unoptimized
              />
            </foreignObject>

            <foreignObject
              x={coords.x + 10}
              y={coords.y - 40}
              width="280"
              height="300"
            >
              <div className="bg-white rounded-lg shadow-lg px-4 py-3 text-[16px] leading-relaxed text-black overflow-y-auto max-h-[280px]">
                {schools.map((school) => (
                  <div key={school.id} className="mb-1">
                    {school.name} ({school.corporationType})
                  </div>
                ))}
              </div>
            </foreignObject>
          </>
        )}
      </svg>


      {selectedCountry && schools.length > 0 && (
        <div className="max-w-[1000px] mx-auto mt-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">
            {`${selectedCountry} 협약 현황 : ${schools.length}`}
          </h2>
          <table className="w-full table-auto border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">학교명</th>
                <th className="border border-gray-300 px-4 py-2">기관 형태</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{school.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{school.corporationType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
