"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import parser from "html-react-parser";
// import Image from "next/image";
import {
  HtmlDocsProps,
  Language,
  UserInfo,
  AllData,
} from "@/app/common/types";
import {
  getError,
  deleteSuccess,
  deleteError,
  //editorCompo,
  locationMap,
  //guidanceMenu,
} from "../../menu";
import MapCompo from "./MapCompo";
import { useAuth } from "@/app/hook/auth";
import HtmlDocsIdProps from "./HtmlDocsIdProps";

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

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const customFetch = useCustomFetch();
  const router = useRouter();
  const { user } = useAuth();
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

    const fetchUserInfo = async () => {
      try {
        if (user) {
          setUserInfo(user);
        }
        const adminData = await customFetch("/users");
        setIsAdmin(adminData.result);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchData();
    fetchUserInfo();
  }, [customFetch, language, props.category, props.id, user]);

  const onUpdate = (guidanceId?: string) => {
    router.push(`/post-update/${guidanceId ?? props.id}`);
  };

  const onDelete = async (guidanceId?: string) => {
    try {
      await customFetch(`/posts/${guidanceId ?? props.id}`, {
        method: "DELETE",
      });
      alert(deleteSuccess[language]?.contentDelete);
      router.back();
    } catch (error) {
      alert(deleteError[language]?.delete);
      console.error(error);
    }
  };

  const canEditOrDelete = isAdmin || userInfo?.id === allData.userId;

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
          onUpdate={onUpdate} 
          onDelete={onDelete} 
          canEditOrDelete={canEditOrDelete} 
        />
      }

      {props.category === "directions" && (
        <>
          <section
            className="w-full mt-4 flex justify-center"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <MapCompo />
          </section>
          <section className="w-full mt-0 flex justify-center">
            <div className="w-[70%] bg-[#5592e7] p-4 mb-10">
              <div className="text-left text-white text-lg font-bold">
                {locationMap[language]["main-campus"]}
              </div>
            </div>
          </section>
        </>
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