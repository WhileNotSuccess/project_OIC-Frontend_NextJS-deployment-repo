"use client";
import Image from "next/image";
import { Language } from "./app/common/types";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HomePageTitle, menu, smallMenu } from "./app/menu";
// import LoginCompo from "./app/(TitleLayout)/components/LoginCompo";
import ManagementCookieCompo from "./app/(TitleLayout)/components/ManagementCookieCompo";
import Link from "next/link";


export default function SideMenu() {
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);


  return (
    <div className="group sm:block hidden">
      <div className="fixed top-0 left-0 bg-[#0C588D] w-40 h-full flex flex-col items-center 
        py-4 text-white text-sm font-semibold text-center">
        <Link
          href={"/home"}
          className="w-full h-24 flex flex-col justify-center items-center">
          <Image
            src={"/images/yeungjinLogo.svg"}
            alt="영진전문대 로고"
            width={200}
            height={200}
            className="w-12 h-12 mt-4"
          />
          <h2>{HomePageTitle[language].yeungjin}<br></br>
            {HomePageTitle[language].OfficeOfInternationalCooperation}
          </h2>
        </Link>
        <div className="mt-4 w-full h-8  group-hover:h-32 duration-300 ease-in-out">
          <div className="h-8 flex justify-center items-center ">
            {menu[language].introduction}
          </div>
        </div>
        <div className="w-full h-8 group-hover:h-48 duration-300 ease-in-out">
          <div className="h-8 flex justify-center items-center">
            {menu[language].internationalAdmissions}
          </div>
        </div>
        <div className="w-full h-8 group-hover:h-24 duration-300 ease-in-out">
          <div className="h-8 flex justify-center items-center">
            {menu[language].globalProgram}
          </div>
        </div>
        <div className="w-full h-8 group-hover:h-16 duration-300 ease-in-out">
          <div className="h-8 flex justify-center items-center">
            {menu[language].newsAndAnnouncements}
          </div>
        </div>
        <div className="w-full h-8">
          <div className="h-8 flex justify-center items-center">
            {menu[language].koreanLanguageEducationCenter}
          </div>
          <div className="w-40 fixed bottom-5">
            <ManagementCookieCompo />
            {/* <LoginCompo /> */}
          </div>
        </div>
      </div>
      <div className={`group-hover:block fixed top-0 left-40 bg-[#0C588D] opacity-0 group-hover:opacity-80 translate-x-[-100%] 
      group-hover:translate-x-0 transition-transform duration-300 ease-in-out w-40 h-full 
      flex flex-col items-center py-4 text-white font-semibold text-center z-12 text-sm ${language === "english" ? "w-68" : "w-40"}`}>
        <div className="mt-4 w-full h-24">
        </div>
        <div className="h-32 border-b">
          <Link
            href={"/guidance/introduction"}
            className="h-1/4 flex items-center justify-center">
            {smallMenu[language].introduction}
          </Link>
          <Link
            href={"/staff/staff-intro"}
            className="h-1/4 flex items-center justify-center">
            {smallMenu[language]["staff-intro"]}
          </Link>
          <Link
            href={"/select/international-agreements"}
            // href={"/"} 
            className="h-1/4 flex items-center justify-center">
            {smallMenu[language]["international-agreements"]}
          </Link>
          <Link
            href={"/guidance/contact"} 
            className="h-1/4 flex items-center justify-center">
            {smallMenu[language].contact}
          </Link>
        </div>
        <div className="h-48 border-b">
          <Link
            href={"/guidance/admission-guide"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language]["admission-guide"]}
          </Link>
          {/* <Link
            href={"https://ipsi.yju.ac.kr/ipsi/3828/subview.do"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language].departmentInformation}
          </Link> */}
          <Link
            href={"/guidance/campus-life"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language]["campus-life"]}
          </Link>
          <Link
            href={"/guidance/student-support"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language]["student-support"]}
          </Link>
          <Link
            href={"/guidance/dormitory"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language].dormitory}
          </Link>
          <Link
            href={"/board/resources"}
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language].resources}
          </Link>
        </div>
        <div className="h-24 border-b">
          <Link
            href={"/global/global-programs"}
            className="h-1/3 flex items-center justify-center">
            {smallMenu[language]["global-programs"]}
          </Link>
          <Link
            href={"/guidance/global-internships"}
            className="h-1/3 flex items-center justify-center">
            {smallMenu[language]["global-internships"]}
          </Link>
          <Link
            href={"/guidance/overseas-careers"}
            className="h-1/3 flex items-center justify-center">
            {smallMenu[language]["overseas-careers"]}
          </Link>
        </div>
        <div className="h-16 border-b">
          <Link
            href={"/board/news"}
            className="h-1/2 flex items-center justify-center">
            {smallMenu[language].news}
          </Link>
          <Link
            href={"/board/notice"}
            className="h-1/2 flex items-center justify-center">
            {smallMenu[language].notice}
          </Link>
        </div>
        <Link
          href={"https://kcenter.yju.ac.kr/home"}
          className="h-8 flex items-center justify-center">
          {smallMenu[language].shortcut}
        </Link>
      </div>
    </div>
  );
}