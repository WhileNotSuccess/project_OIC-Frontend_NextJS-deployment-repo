"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NoticeCarousel from "./NoticeCarousel";
import NewsCarousel from "./NewsCarousel";
import EnrollmentInfo from "./EnrollmentInfo";
import Pride from "./Pride";
import { MainComponent } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function HomeCompo() {
  const [isVisibleTitle, setIsVisibleTitle] = useState(false);
  const [isVisiblePride, setIsVisiblePride] = useState(false);
  const prideRef = useRef(null);
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleTitle(true);
    }, 500);
  }, []);

  useEffect(() => {
    const node = prideRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisiblePride(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full min-h-screen bg-[#000000]">
        <Image
          src="/images/yeungjinTitlePicture.jpg"
          alt="yeungjinTitlePicture"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-50"
        />
        <div
          className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left 
            ${isVisibleTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
            transition-all duration-1000 ease-in-out z-10 w-full text-center px-4 md:px-0`}
        >
          <h1 className="ml-10 text-4xl md:text-8xl text-shadow font-bold">
            Global Leader,<br /> Yeungjin University
          </h1>
          <h1 className="ml-10 text-2xl md:text-4xl font-bold">
            Office of International Cooperation
          </h1>
        </div>
      </div>

      <div className="relative w-full">
        <div className="relative w-full min-h-[60vh] flex items-center justify-center px-4 md:px-0">
          <div className="bg-gray-200 min-h-[50vh] w-full justify-center items-center flex flex-col">
            <div
              ref={prideRef}
              className={`${isVisiblePride ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}  transition-all duration-1000 ease-in-out w-full text-center px-4 md:px-0`}
            >
              <h1 className="mb-10 text-4xl md:text-5xl font-bold text-amber-950">
                PRIDE OF YEUNGJIN
              </h1>
              <Pride />
            </div>
          </div>
        </div>

        <div className="w-full bg-white px-4 md:px-10 py-10">
          <h2 className="text-3xl font-bold mb-8">{MainComponent[language].News}</h2>
          <div className="max-w-full overflow-x-auto">
            <div className="w-[300%] md:w-full">
              <NewsCarousel />
            </div>
          </div>
        </div>

        <div className="w-full min-h-[60vh] px-4 md:px-10 py-10">
          <h2 className="text-3xl font-bold mb-8">{MainComponent[language].Notice}</h2>
          <div className="max-w-full overflow-x-auto">
            <div className="w-[300%] md:w-full">
              <NoticeCarousel />
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-10 py-10">
          <h2 className="text-3xl font-bold mb-5">{MainComponent[language].Admissions}</h2>
          <div className="w-full p-4 md:p-10 relative h-[400px]">
            <Image
              src="/images/yeungjinBackgroundImage.png"
              alt="yeungjinBackground"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0"
            />

            <div className="absolute inset-0 bg-black/50 z-10" />

            <div className="relative z-10 flex flex-col justify-center items-start mt-10 h-full text-white px-2 md:px-10 text-left">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                영진전문대학교 학위과정 입학에 관한 문의가 있으시다면,<br />
                아래의 이메일이나 전화번호로 언제든지 연락 주시기 바랍니다.
              </h2>
              <p className="text-base md:text-xl">
                +82-53-940-5555(영어), +82-53-940-5555(일본어) yju.intl@yju.ac.kr
              </p>
            </div>

          </div>
        </div>

        <div className="w-full bg-white px-4 md:px-10 py-10">
          <h1 className="text-3xl font-bold mb-5">입학신청서 및 모집요강 </h1>
          <EnrollmentInfo />
        </div>
      </div>
    </div>
  );
}