"use client";
import { Language } from "@/app/common/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { smallMenu } from "@/app/menu";


type TitleProps = {
  category: string;
}

export default function Title({ category }: TitleProps) {
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="w-full h-32 sm:h-68 border flex items-center bg-[#000000] relative">
      <Image
        src={"/images/yeungjinTitlePicture.jpg"}
        alt="영진전문대 국제교류처 제목 사진"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      >
      </Image>
      <div className="absolute top-1/3 left-0 ml-12 text-white font-bold text-4xl sm:text-7xl">
        {smallMenu[language][category]}
      </div>
    </div>
  );
}