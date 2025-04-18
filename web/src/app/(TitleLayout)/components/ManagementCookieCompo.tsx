"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Language } from "../../common/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

// 리덕스로 하든 로컬에 저장을 하든 훅으로 하든 암튼 모든파일에서 불러오는건 배드

export default function ManagementCookieCompo() {
  const [language, setLanguage] = useState<Language>(Language.korean);
  const router = useRouter();

  useEffect(() => {
    const currentLanguage = Cookies.get("language");
    if (!currentLanguage) {
      Cookies.set("language", "korean", {
        expires: 30, // 30일 동안 유지
        path: "/", // 모든 경로
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, // 백엔드로 쿠키를 보내기 위한 설정
        sameSite: "none", // 백엔드로 쿠키를 보내기 위한 설정
        secure: true, // 백엔드로 쿠키를 보내기 위한 설정
      });
    }
  }, []);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [language]);

  const SetChangeCookie = (language: Language) => {
    Cookies.set("language", language, {
      expires: 30, // 30일 동안 유지
      path: "/", // 모든 경로
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, // 백엔드로 쿠키를 보내기 위한 설정
      sameSite: "none", // 백엔드로 쿠키를 보내기 위한 설정
      secure: true, // 백엔드로 쿠키를 보내기 위한 설정
    });
    if (
      window.location.pathname.startsWith("/board") &&
      /\d+$/.test(window.location.pathname.split("/").pop() || "")
    ) {
      router.push("/");
    } else {
      window.location.reload();
    }
    setLanguage(language);
  };

  return (
    <div className="flex justify-center items-center">
      {language !== "japanese" ? (
        <Image
          alt="일본 국기"
          src="/images/japan.svg"
          className="w-6 h-4 mr-4 cursor-pointer"
          width={10}
          height={10}
          onClick={() => SetChangeCookie(Language.japanese)}
        ></Image>
      ) : (
        <Image
          alt="한국 국기"
          src="/images/korea.svg"
          className="w-6 h-4 mr-4 cursor-pointer"
          width={10}
          height={10}
          onClick={() => SetChangeCookie(Language.korean)}
        ></Image>
      )}
      {language !== "english" ? (
        <Image
          alt="미국 국기"
          src="/images/usa.svg"
          className="w-6 h-4 cursor-pointer"
          width={10}
          height={10}
          onClick={() => SetChangeCookie(Language.english)}
        ></Image>
      ) : (
        <Image
          alt="한국 국기"
          src="/images/korean.svg"
          className="w-6 h-4 cursor-pointer"
          width={10}
          height={10}
          onClick={() => SetChangeCookie(Language.korean)}
        ></Image>
      )}
    </div>
  );
}
