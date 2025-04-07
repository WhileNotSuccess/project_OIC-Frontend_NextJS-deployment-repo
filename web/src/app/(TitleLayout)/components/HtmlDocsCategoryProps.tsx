"use client";

import { Language } from "@/app/common/types";
import { guidanceMenu } from "@/app/menu";

interface HtmlDocsCategoryProps {
  language : Language;
  category : string;
}

// props가 category인지 id인지 구분하려고 만들긴했는데
// 이 코드는 제목 띄우는 코드라 필요 없는 코드 같음 상의 하고 지울 예정

export default function HtmlDocsCategoryProps({ language, category } : HtmlDocsCategoryProps){

  return(
    <section className="w-full flex justify-center">
      <header
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {guidanceMenu[language]?.[category]}
      </header>
    </section>
  );
}