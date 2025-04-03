"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import parser from "html-react-parser";
import Image from "next/image";
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
  editorCompo,
  locationMap,
  guidanceMenu,
} from "../../menu";
import MapCompo from "./MapCompo";
import { useAuth } from "@/app/hook/auth";

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

      <section className="w-full flex justify-center">
        {/* div넣지말 그냥 함수로 빼 div리턴되잖아 */}
        {props.category ? (
          <header
            className="w-full flex justify-center items-center font-bold text-3xl"
            style={{ height: "200px" }}
          >
            {guidanceMenu[language]?.[props.category]}
          </header>
        ) : (
          <article className="w-11/12 flex flex-col mt-4">
            <div className="flex justify-between items-center border-t-2 border-blue-400 pt-2">
              <div className="text-lg font-bold">{allData.title}</div>
            </div>

            <section className="text-sm mt-2 border-b-2 pb-2 flex items-center">
              <Image
                alt="작성자 아이콘"
                src="/images/author.png"
                width={15}
                height={15}
              />
              <div>{allData.author}</div>
              <Image
                alt="작성일 아이콘"
                src="/images/createdDate.png"
                width={15}
                height={15}
                className="ml-4 mr-2"
              />
              {/* data-fns 라는 유틸이 있다고 함  따로 검색해봐봐*/}
              <div>{allData.createdDate.substring(0, 10)}</div>
            </section>


            {allData.documentFiles.length > 0 ? (
              <section className="border-b-2 pb-2 pt-2">
                {allData.documentFiles.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <Image
                      alt="첨부파일 아이콘"
                      src="/images/attachFile.png"
                      className="mr-2"
                      width={15}
                      height={15}
                    />
                    <button
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.filename}`,
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {item.filename}
                    </button>
                  </div>
                  
                ))}
              </section>
            ) : (
              <p className="mt-2">{getError[language]?.noFile}</p>
            )}


            {canEditOrDelete && (
              <div className="flex space-x-4 ml-auto mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => onUpdate(allData.guidanceId)}
                >
                  {editorCompo[language]?.update}
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => onDelete(allData.guidanceId)}
                >
                  {editorCompo[language]?.delete}
                </button>
              </div>
            )}
          </article>
        )}
      </section>

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
