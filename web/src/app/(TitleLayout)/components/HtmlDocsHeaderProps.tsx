"use client";

import { Language, ServerDocumentFile } from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { deleteError, deleteSuccess, editorCompo, getError } from "@/app/menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HtmlDocsHeaderProps {
  title : string;
  author : string;
  createdDate : string;
  documentFiles : ServerDocumentFile[];
  guidanceId : string;
  language : Language;
  canEditOrDelete : boolean;
}

export default function HtmlDocsHeaderProps({
  title,
  author,
  createdDate,
  documentFiles,
  guidanceId,
  language,
  canEditOrDelete,
} : HtmlDocsHeaderProps){
  const router = useRouter();
  const customFetch = useCustomFetch();

  const onUpdate = (guidanceId?: string) => {
    router.push(`/postUpdate/${guidanceId}`);
  };

  const onDelete = async (guidanceId?: string) => {
    try {
      const response = await customFetch(`/post/${guidanceId}`, {
        method: "DELETE",
      });
      if(response.ok){
        alert(deleteSuccess[language]?.contentDelete);
        router.back();
      }
    } catch (error) {
      alert(deleteError[language]?.delete);
      console.error(error);
    }
  };

  return(
    <section className="w-full flex justify-center">
      <article className="w-11/12 flex flex-col mt-4">
        <div className="flex justify-between items-center border-t-2 border-blue-400 pt-2">
          <div className="text-lg font-bold">{title}</div>
        </div>

        <section className="text-sm mt-2 border-b-2 pb-2 flex items-center">
          <Image
            alt="작성자 아이콘"
            src="/images/author.png"
            width={15}
            height={15}
          />
          <div>{author}</div>
          <Image
            alt="작성일 아이콘"
            src="/images/createdDate.png"
            width={15}
            height={15}
            className="ml-4 mr-2"
          />
          {/* date-fns 라는 유틸이 있다고 함  따로 검색해봐봐*/}
          <div>{createdDate.substring(0, 10)}</div>
        </section>


        {documentFiles.length > 0 ? (
          <section className="border-b-2 pb-2 pt-2">
            {documentFiles.map((item) => (
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
              onClick={() => onUpdate(guidanceId)}
            >
              {editorCompo[language]?.update}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => onDelete(guidanceId)}
            >
              {editorCompo[language]?.delete}
            </button>
          </div>
        )}
      </article>
    </section>
  );
}