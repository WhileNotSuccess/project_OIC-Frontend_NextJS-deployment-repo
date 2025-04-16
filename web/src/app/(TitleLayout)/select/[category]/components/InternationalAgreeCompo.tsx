"use client";
import { useState } from "react";
import Image from "next/image";





export default function InternationalAgreeCompo() {
  const [country, setCountry] = useState("default");


  const exampleList = [ // 임시 데이터
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },
    { schoolName: "흑룡강수리전과학교", schoolDivision: "대학" },

  ];
  const locationCoords: { [key: string]: { top: string; left: string } } = {
    usa: { top: "38%", left: "20%" },
    japan: { top: "36%", left: "83%" },
    china: { top: "40%", left: "73%" },
  };

  const selectCountry = (key: string) =>
    `px-4 py-2 font-bold text-xl transition duration-300 rounded-lg hover:bg-blue-500 hover:text-white 
    ${country === key ? "bg-blue-200 text-blue-800" : "text-gray-800"}`;

  return (
    <>
      <div className="flex flex-col justify-center w-full h-full space-y-4 mt-4 ml-2">
        <div className="space-x-4">
          <button
            onClick={() => setCountry("default")}
            className="px-4 py-2 font-bold text-3xl"
          >
            국가
          </button>
          <button
            onClick={() => setCountry("usa")}
            className={selectCountry("usa")}
          >
            미국
          </button>
          <button
            onClick={() => setCountry("japan")}
            className={selectCountry("japan")}
          >
            일본
          </button>
          <button
            onClick={() => setCountry("china")}
            className={selectCountry("china")}
          >
            중국
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-[1600px] aspect-[16/9] mt-5 mx-auto">
        <Image
          src={"/images/world.png"}
          alt={`${country}`}
          layout="fill"
          objectFit="contain"
        />
        {country !== "default" && (
          <div
            className="absolute"
            style={{
              top: locationCoords[country].top,
              left: locationCoords[country].left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex flex-col items-center">
              <Image
                src="/images/locationIcon.png"
                alt="locationIcon"
                className="w-6 md:w-8 lg:w-10 animate-bounce"
                width={40}
                height={40}
              />

              <div className="mt-2 bg-white rounded-lg shadow-lg px-4 py-3 text-sm max-w-[200px] whitespace-nowrap">
                {exampleList.map((school, idx) => (
                  <div key={idx} className="mb-1">
                    {school.schoolName} {school.schoolDivision}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
}
