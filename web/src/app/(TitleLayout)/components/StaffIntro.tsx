"use client";

import { Language, Teacher } from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import { getError } from "@/app/menu";
import Cookies from "js-cookie";
import Image from "next/image";

// 넌 디자인 행이다다

export default function StaffIntro() {
  // const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
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
        // setTeacher(data.teacher);
        setStaff(data.staff);
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

      <section className="w-full">
        <div className="w-full h-24 flex items-center justify-center">
          <div className="w-full h-14 text-2xl font-bold text-[#000000]">
            {/* {staffPage[language]?.faculty} */}
            국제교류원
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <ul className="flex flex-wrap justify-between mt-4">
            {staff.map((item) => {
              return (
                <li
                  key={item.id}
                  className="w-76 h-40 border-t-2 border-[#0C588D] bg-[#F6F6F6] mb-4 text-[#000000] flex flex-col justify-between"
                >
                  <div className=" flex flex-col justify-center">
                    <div className="p-2 h-8 ml-2 font-semibold">{item.position}</div>
                    <div className="p-4 text-xl font-semibold">
                      {item.name}
                    </div>
                  </div>
                  <div className="w-full border-t-2 border-[#0C588D] font-bold h-8 flex items-center pl-2">
                    <div className="h-8 ml-2 font-bold flex flex-row items-center gap-2 text-sm text-[#909090] overflow-hidden whitespace-nowrap">
                      <Image
                        alt="전화기 아이콘"
                        src="/images/telephone.png"
                        width={15}
                        height={15}
                        className="mr-2"
                      />{" "}
                      {item.phone}
                      <Image
                        alt="이메일 아이콘"
                        src="/images/mail.png"
                        className="mr-2"
                        width={15}
                        height={15}
                      />
                      {item.email}
                    </div>                                      
                  </div>                  
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="w-full mt-6">
        <div className="w-full h-24 flex items-center justify-center">
          <div className="w-full h-14 text-2xl font-bold text-[#000000]">
            {/* {staffPage[language]?.staff} */}
            한국어교육센터
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <ul className="flex flex-wrap justify-between mt-4">
            {staff.map((item) => {
              return (
                <li
                  key={item.id}
                  className="w-76 h-40 border-t-2 border-[#0C588D] bg-[#F6F6F6] mb-4 text-[#000000] flex flex-col justify-between"
                >
                  <div className=" flex flex-col justify-center">
                    <div className="p-2 h-8 ml-2 font-semibold">{item.position}</div>
                    <div className="p-4 text-xl font-semibold">
                      {item.name}
                    </div>
                  </div>
                  <div className="border-t-2 border-[#0C588D] font-bold h-8 flex items-center pl-2">
                    <div className="h-8 ml-2 font-bold flex flex-row items-center gap-2 text-sm text-[#909090] overflow-hidden whitespace-nowrap">
                      <Image
                        alt="전화기 아이콘"
                        src="/images/telephone.png"
                        width={15}
                        height={15}
                        className="mr-2"
                      />{" "}
                      {item.phone}
                      <Image
                        alt="이메일 아이콘"
                        src="/images/mail.png"
                        className="mr-2"
                        width={15}
                        height={15}
                      />
                      {item.email}
                    </div>                                      
                  </div>                  
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
