"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import Cookies from "js-cookie";
import parser from "html-react-parser";
// import Image from "next/image";
import {
  HtmlDocsProps,
  Language,
  AllData,
} from "@/app/common/types";
import {
  getError,
  //editorCompo,
  //guidanceMenu,
} from "../../menu";
import HtmlDocsIdProps from "./HtmlDocsIdProps";
import HtmlDocsDirection from "./HtmlDocsDirection";
import { useCheckAdmin } from "@/app/lib/canEditOrDelete";

// useEffect 에서는 함수 호출만 선언은 밖에서
export default function HtmlDocs(props: HtmlDocsProps) {
  const [allData, setAllData] = useState<AllData>({
    content: "",
    title: "",
    documentFiles: [],
    guidanceId: "",
    author: "",
    createdDate: "",
    userId: 0,
  });

  const customFetch = useCustomFetch();
  const { canEditOrDelete } = useCheckAdmin(allData.userId);
  const [language, setLanguage] = useState<Language>(Language.korean);

  console.log(canEditOrDelete);

  // date-fns 라는 유틸이 있다고 함  따로 검색해봐봐 -> 바꿔놓겠습니다 20250407 작성
  // canEditOrDelete 어떻게 바꾸라고 했는지 잘 기억이 안남

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = props.id
          ? `/posts?id=${props.id}`
          : `/posts?category=${props.category}`;
        const data = await customFetch(endpoint, { method: "GET" });

        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.Id,
          author: data.data.author,
          createdDate: data.data.createdDate,
          userId: data.data.userId,
        });
      } catch {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };

    fetchData();
  }, [customFetch, language, props.category, props.id]);


  return (
    <main className="w-full">
      <div className="h-12"></div>

      {props.category ? 
        null
        : 
        <HtmlDocsIdProps
          title={allData.title}
          author={allData.author} 
          createdDate={allData.createdDate} 
          documentFiles={allData.documentFiles} 
          guidanceId={allData.guidanceId}
          language={language} 
          canEditOrDelete={canEditOrDelete} 
        />
      }

      {props.category === "contact" && (
        <HtmlDocsDirection language={language}/>
      )}

      <section className="w-full flex justify-center">
        <div className="w-3/5 min-h-dvh">
          <div className="prose w-full break-words">
            {parser(allData.content)}
          </div>
        </div>
      </section>
    </main>
  );
}