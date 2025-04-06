"use client";
import Image from "next/image";
import { Language } from "./app/common/types";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HomePageTitle, menu, smallMenu } from "./app/menu";
import LoginCompo from "./app/(TitleLayout)/components/LoginCompo";
import ManagementCookieCompo from "./app/(TitleLayout)/components/ManagementCookieCompo";
import Link from "next/link";


export default function SideMenu(){
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  

  return(
    <div className="group">
      <div className="fixed top-0 left-0 bg-[#0072aa] w-40 h-full flex flex-col items-center 
        py-4 text-white font-bold text-center">
        <div className="w-full h-24 flex flex-col justify-center items-center">
          <Image
            src={"/images/yeungjinLogo.svg"}
            alt="영진전문대 로고"
            width={200}
            height={200}
            className="w-12 h-12"
          />
          <h1>{HomePageTitle[language].yeungjin}<br></br>
            {HomePageTitle[language].OfficeOfInternationalCooperation}
          </h1>
        </div>
        <div className="mt-4 w-full h-8  group-hover:h-32 duration-300 ease-in-out">
          <div className="h-8 flex justify-center items-center">
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
          <div className="w-40 fixed bottom-0">
            <ManagementCookieCompo/>
            <LoginCompo/>
          </div>
        </div>
      </div>
      <div className="group-hover:block fixed top-0 left-40 bg-[#0072aa] opacity-0 group-hover:opacity-80 translate-x-[-100%] 
      group-hover:translate-x-0 transition-transform duration-300 ease-in-out w-40 h-full 
      flex flex-col items-center py-4 text-white font-bold text-center z-12">
        <div className="mt-4 w-full h-24">
        </div>
        <div className="h-32 border-b">
          <div className="h-1/4 flex items-center justify-center">
            {smallMenu[language].introduction}
          </div>
          <div className="h-1/4 flex items-center justify-center">
            {smallMenu[language].facultyAndStaffIntroduction}
          </div>
          <div className="h-1/4 flex items-center justify-center">
            {smallMenu[language].internationalAgreementsStatus}
          </div>
          <div className="h-1/4 flex items-center justify-center">
            {smallMenu[language].contactInformation}
          </div>
        </div>
        <div className="h-48 border-b">
          <div className="h-1/6 flex items-center justify-center">
            {smallMenu[language].admissionInformation}
          </div>
          <Link
            href={"https://ipsi.yju.ac.kr/ipsi/3828/subview.do"} 
            className="h-1/6 flex items-center justify-center">
            {smallMenu[language].departmentInformation}
          </Link>
          <div className="h-1/6 flex items-center justify-center">
            {smallMenu[language].campusLife}
          </div>
          <div className="h-1/6 flex items-center justify-center">
            {smallMenu[language].studentSupportServices}
          </div>
          <div className="h-1/6 flex items-center justify-center">
            {smallMenu[language].dormitoryInformation}
          </div>
          <div className="h-1/6 flex items-center justify-center">
            {smallMenu[language].qna}
          </div>
        </div>
        <div className="h-24 border-b">
          <div className="h-1/3 flex items-center justify-center">
            {smallMenu[language].globalProgram}
          </div>
          <div className="h-1/3 flex items-center justify-center">
            {smallMenu[language].globalFieldStudy}
          </div>
          <div className="h-1/3 flex items-center justify-center">
            {smallMenu[language].overseasEmploymentSupporting}
          </div>
        </div>
        <div className="h-16 border-b">
          <div className="h-1/2 flex items-center justify-center">
            {smallMenu[language].notifications}
          </div>
          <div className="h-1/2 flex items-center justify-center">
            {smallMenu[language].announcements}
          </div>
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