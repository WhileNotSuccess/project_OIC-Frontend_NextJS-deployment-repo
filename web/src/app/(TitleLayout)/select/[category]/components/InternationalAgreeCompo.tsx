"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import { internationalAgreeMessage } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function InternationalAgreeCompo() {

  const [countries, setCountries] = useState<
    { id: number; name: string; x: number; y: number }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [schools, setSchools] = useState<
    { id: number; name: string; corporationType: string }[]
  >([]);
  const [language, setLanguage] = useState<Language>(Language.korean);

  const customFetch = useCustomFetch();

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const fetchCountries = async () => {
      try {
        const res = await customFetch("/corporation/countries", {
          method: "GET",
        });
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
      <div className="flex justify-center mt-4">
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
              <img
                src="/images/locationIcon.png"
                alt="location"
                className="w-full h-full animate-bounce"
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
    </div>
  );
}
