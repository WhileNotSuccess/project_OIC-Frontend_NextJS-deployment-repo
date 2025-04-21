"use client";
import { useState } from "react";

export default function InternationalAgreeCompo() {
  const [country, setCountry] = useState("default");

  const exampleList = [
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
  ];

  const locationCoords: { [key: string]: { x: number; y: number } } = {
    usa: { x: 350, y: 360 },
    japan: { x: 1350, y: 370 },
    china: { x: 1170, y: 360 },
  };

  return (
    <div className="w-full">
      {/* 국가 선택 버튼 */}
      <div className="flex flex-col justify-center w-full space-y-4 mt-4 ml-2">
        <div className="space-x-4">
          <button
            onClick={() => setCountry("default")}
            className="px-4 py-2 font-bold text-3xl"
          >
            국가
          </button>
          <button
            onClick={() => setCountry("usa")}
            className={`px-4 py-2 font-bold text-xl transition duration-300 rounded-lg hover:bg-blue-500 hover:text-white 
            ${country === "usa" ? "bg-blue-200 text-blue-800" : "text-gray-800"}`}
          >
            미국
          </button>
          <button
            onClick={() => setCountry("japan")}
            className={`px-4 py-2 font-bold text-xl transition duration-300 rounded-lg hover:bg-blue-500 hover:text-white 
            ${country === "japan" ? "bg-blue-200 text-blue-800" : "text-gray-800"}`}
          >
            일본
          </button>
          <button
            onClick={() => setCountry("china")}
            className={`px-4 py-2 font-bold text-xl transition duration-300 rounded-lg hover:bg-blue-500 hover:text-white 
            ${country === "china" ? "bg-blue-200 text-blue-800" : "text-gray-800"}`}
          >
            중국
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 1600 900"
        className="w-full h-auto max-w-[1000px] mx-auto mt-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href="/images/world.png" width="1600" height="900" />

        {country !== "default" && locationCoords[country] && (
          <>

            <foreignObject
              x={locationCoords[country].x - 20}
              y={locationCoords[country].y - 40}
              width="40"
              height="40"
            >
              <img
                src="/images/locationIcon.png"
                alt="location"
                className="w-full h-full animate-bounce "
              />
            </foreignObject>

            <foreignObject
              x={locationCoords[country].x + 10}
              y={locationCoords[country].y - 40}
              width="240"
              height="200"
            >
              <div className="bg-white rounded-lg shadow-lg px-4 py-3 text-[16px] leading-relaxed text-black">
                {exampleList.map((school, idx) => (
                  <div key={idx} className="mb-1">
                    {school.schoolName} {school.schoolDivision}
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
