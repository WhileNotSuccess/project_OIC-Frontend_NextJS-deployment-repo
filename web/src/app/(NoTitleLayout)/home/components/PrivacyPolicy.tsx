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
  return <div className="w-full text-center">
    <br />
    <br />
    <br />
    <a className="text-center" href="http://www.yju.ac.kr/kr/4410/subview..do">
      {privacyPolicyText[language]}
    </a>
  </div>;
}