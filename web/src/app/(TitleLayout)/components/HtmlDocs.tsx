"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
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
import HtmlDocsHeaderProps from "./HtmlDocsHeaderProps";
import HtmlDocsDirection from "./HtmlDocsDirection";
import { useCheckAdmin } from "@/app/hook/canEditOrDelete";

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
          ? `/post/one/id/${props.id}`
          : `/post/one/category/${props.category}`;
        const response = await customFetch(endpoint, { method: "GET" });
        const data = await response.json();
        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.id,
          author: data.data.author,
          createdDate: data.data.createdDate,
          userId: data.data.userId,
        });
        console.log(allData.content);
      } catch {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };

    fetchData();
  }, [props.category, props.id]);


  return (
    <main className="w-full px-12">
      <div className="h-12"></div>

      {props.category ?
        null
        :
        <HtmlDocsHeaderProps
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
        <HtmlDocsDirection language={language} />
      )}
      {allData.content &&
        <section className="w-full flex justify-center">
          <div className="w-full min-h-dvh">
            <div className="prose w-full break-words">
              {parser(allData.content)}
            </div>
          </div>
        </section>}
    </main>
  );
}