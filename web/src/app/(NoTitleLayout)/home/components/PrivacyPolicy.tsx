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

  return (
    <div className="w-full">
      <br />
      <hr />
      <br />
      <div className="flex items-center ml-10">
        <img
          src="https://www.yjp.ac.kr/img/portal/main/new/layout/footlogo.gif"
          alt="yjp logo"
        />
        <div className="ml-4">
          41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 대표전화:
          053-940-5114
        </div>
        {/* a 태그의 클래스를 ml-4에서 ml-auto로 변경합니다. */}
        <a
          className="text-blue-900 ml-auto mr-10 whitespace-nowrap" // 오른쪽에도 여백을 주기 위해 mr-10 추가
          href="http://www.yju.ac.kr/kr/4410/subview..do"
        >
          {privacyPolicyText[language]}
        </a>
      </div>
      <br />
    </div>
  );
}