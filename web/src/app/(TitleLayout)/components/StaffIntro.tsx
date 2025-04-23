"use client";

import { Language, Teacher } from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import { getError } from "@/app/menu";
import Cookies from "js-cookie";
import StaffMapCompo from "../staff/components/StaffMapCompo";

// 넌 디자인 행이다다

export default function StaffIntro() {
  // const [international, setInternational] = useState<Teacher[]>([]);
  // const [internationalTeam, setInternationalTeam] = useState<Teacher[]>([]);
  // const [chinaCenter, setChinaCenter] = useState<Teacher[]>([]);
  const [allStaffData, setAllStaffData] = useState<Record<string,Teacher[]>>({});
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const staffData = async () => {
      try {
        const response = await customFetch("/staff", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data.data);
        setAllStaffData(data.data);
      } catch  {
        alert(getError[language]?.staffError);
      }
    };
    staffData();
  }, []);

  return (
    <div className="w-full px-12">
      <section
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
      </section>
      {
        Object.entries(allStaffData).map(([key,value])=>( // 객체를 [키,값] 형태로 반환해주는 메서드
          <section className="w-full" key={key}>
            <div className="w-full h-24 flex items-center justify-center">
              <div className="w-full h-14 text-2xl font-bold text-[#000000]">
                {key}
              </div>
            </div>
            <StaffMapCompo staff={value}/>
          </section>
        ))
      }
    </div>
  );
}