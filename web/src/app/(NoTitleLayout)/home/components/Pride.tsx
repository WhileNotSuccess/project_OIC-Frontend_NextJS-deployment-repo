"use client";

import Image from "next/image";
import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import { PrideMessage } from "@/app/menu";


interface PrideItem {
  korean: string;
  english: string;
  image: string;
  [key: string]: string;
}


const Pride = () => {
  const [language, setLanguage] = useState<Language>(Language.korean);
  const customFetch = useCustomFetch();
  const [prideItems, setPrideItems] = useState<PrideItem[]>([]);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const GetPrideData = async () => {
      try {
        const response = await customFetch("/pride", {
          method: "GET",
        });
        const data = await response.json();
        setPrideItems(data.data);
      } catch {
        console.error(PrideMessage[language].LoadError);
      }
    };
    GetPrideData();
  }, []);


  return (
    <div className="flex justify-between items-start mt-20 gap-8">
      {prideItems.map((item, index) => (
        <div key={index} className="w-1/3 flex flex-col items-center mb-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files${item.image}`}
            alt={item[language]}
            width={200}
            height={200}
            unoptimized
          />
          <p className="mt-4 text-2xl font-bold text-black text-center">
            {item[language]}
          </p>
        </div>
      ))}

    </div>
  );
};

export default Pride;

