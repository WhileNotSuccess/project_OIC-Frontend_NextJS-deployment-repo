"use client";
import { useEffect, useState } from "react";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { privacyPolicyText } from "../privacy-policy-text";

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  return <div className="w-full">
    <br />
    <hr />
    <br />
    <br />
    <div className="flex items-start ml-10">
      <img src="https://www.yjp.ac.kr/img/portal/main/new/layout/footlogo.gif" alt="yjp logo" />
      <div className="flex flex-col ml-4">
        <a className="text-blue-900" href="http://www.yju.ac.kr/kr/4410/subview..do">
          {privacyPolicyText[language]}
        </a>
        <div>
          41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 대표전화: 053-940-5114
        </div>
      </div>
      
    </div>
    <br />
    <br />
    <br />
  </div>;
}