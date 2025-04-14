"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
/* import useCustomFetch from "@/app/lib/customFetch"; */
import NoticeCarousel from "./NoticeCarousel";
import NewsCarousel from "./NewsCarousel";
import EnrollmentInfo from "./EnrollmentInfo";

export default function HomeCompo() {
  const [isVisibleTitle, setIsVisibleTitle] = useState(false);
  const [isVisiblePride, setIsVisiblePride] = useState(false);
  const prideRef = useRef(null);
  /* const customFetch = useCustomFetch(); */

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleTitle(true);
    }, 500);
  }, []);

  useEffect(() => {
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

    if (prideRef.current) {
      observer.observe(prideRef.current);
    }

    return () => {
      if (prideRef.current) {
        observer.unobserve(prideRef.current);
      }
    };
  }, []);





  return (
    <div>
      <div className="relative w-full min-h-screen bg-[#000000]">
        <Image
          src="/images/yeungjinTitlePicture.jpg"
          alt="영진전문대 국제교류원 제목 사진"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div
          className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left 
            ${isVisibleTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
            transition-all duration-1000 ease-in-out z-50 w-full text-center`}
        >
          <h1 className="ml-20 text-4xl md:text-8xl text-shadow font-bold">
            Global Leader,<br /> Yeungjin University
          </h1>
          <h1 className="ml-20 text-2xl md:text-4xl font-bold">
            Office of International Cooperation
          </h1>
        </div>
      </div>

      <div className="relative w-full ">
        <div className="relative w-full min-h-[60vh] flex items-center justify-center">
          <div className="bg-gray-400 min-h-[50vh] w-full">
            <div
              ref={prideRef}
              className={`${isVisiblePride ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000 ease-in-out w-full text-center`}
            >
              <h1 className="text-4xl md:text-3xl font-bold text-amber-950">
                PRIDE OF YEUNGJIN
              </h1>
              <div className="flex justify-between items-center mt-40">
                <div className="w-1/3">1</div>
                <div className="w-1/3">2</div>
                <div className="w-1/3">3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-10">
          <h2 className="text-3xl font-bold">공지사항</h2>
          <NewsCarousel />
        </div>

        <div className="w-full min-h-[60vh] p-10">
          <h2 className="text-3xl font-bold mb-8">알림</h2>
          <NoticeCarousel />
        </div>

        <div className="w-full p-10">
          <h2 className="text-3xl font-bold mb-5">입학문의</h2>
          <div className="w-full p-10 relative h-[400px]">
            <Image
              src="/images/yeungjinBackgroudImage.png"
              alt="yeungjinBackground"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0"
            />

            <div className="absolute inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 flex flex-col justify-center mt-20 h-full text-white ">
              <h2 className="text-2xl font-bold mb-4">영진전문대학교 학위과정 입학에 관한 문의가 있으시다면,<br />
                아래의 이메일이나 전화번호로 언제든지 연락 주시기 바랍니다.</h2>
              <p className="text-xl">+82-123-456(영어),+82-123-456(일본어)  yju.intl@yju.ac.kr</p>
            </div>
          </div>


        </div>

        <div className="w-full bg-white p-10">
          <h1 className="text-3xl font-bold">입학신청서 및 모집요강 </h1>
          <EnrollmentInfo />
        </div>
      </div>
    </div>
  );
}
