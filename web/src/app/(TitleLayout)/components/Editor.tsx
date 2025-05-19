"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Language, ServerDocumentFile } from "@/app/common/types";
import EditorFileUploadCompo from "./EditorFileUpload";
import EditorTitle from "./EditorTitle";
import EditorCategoryLanguage from "./EditorCategoryLanguage";
import EditorTinyMCE from "./EditorTinyMCE";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import useCustomFetch from "@/app/hook/customFetch";
import EditorButton from "./EditorButton";

type EditorProps = {
  id?: string;
  categoryName?: string;
  content?: string;
  title?: string;
};

export default function Editor(props: EditorProps){
  const [content, setContent] = useState<string>("");
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [documentFiles, setDocumentFiles] = useState<Array<File>>([]); // 파일 저장을 위한 상태
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]); // 삭제할 파일 이름 리스트
  const customFormFetch = useCustomFormFetch();
  const customFetch = useCustomFetch();
  const [category, setCategory] = useState<string>(props.categoryName || "");
  // const router = useRouter();
  // const [isAdmin, setIsAdmin] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // 재요청이 아니라 수정버튼을 누르면 로컬에 저장시켜놓고 로컬에 저장한 값을 들고오고 로컬 값 지우기
    const oldPost = async () => {
      if (!props.id) return;
      try {
        const response = await customFetch(`/post/one/id/${props.id}`, {
          method: "GET",
        });
        const data = await response.json();
        setContent(data.data.content);
        setTitle(data.data.title);
        setCategory(data.data.category);
        setDocumentFileNames(
          data.files.map((file: ServerDocumentFile) => file.filename),
        );
      } catch (error) {
        console.error(error);
      }
    };
    oldPost();
  }, [props.id,customFetch]);

  return(
    <main className="w-full flex justify-center px-12">
      <section style={{ width: "100%" }} className="mt-4">
        <EditorTitle
          title={title}
          setTitle={setTitle}/>
        {/* EditorCategoryLanguage는 추후에 관리자인지 확인하는 3항이나 조건문이 필요함 */}
        <EditorCategoryLanguage
          category={category} // oldPost에서도 상태관리가 있어서 안뺌
          setCategory={setCategory}
          language={language}
          setLanguage={setLanguage}
        />
        <section style={{ width: "100%" }} className="mt-4">
          <EditorFileUploadCompo
            setDocumentFiles={setDocumentFiles}
            deleteFileNames={deleteFileNames}
            setDeleteFileNames={setDeleteFileNames}
            language={language}
            documentFileNames={documentFileNames}
            setDocumentFileNames={setDocumentFileNames}          
          />
        </section>
        <EditorTinyMCE
          content={content}
          setContent={setContent}
          customFormFetch={customFormFetch}
          language={language}
        />
        <EditorButton
          deleteFileNames={deleteFileNames}
          customFetch={customFetch}
          id={props.id}
          language={language}
          title={title}
          content={content}
          category={category}
          documentFiles={documentFiles}
        />
      </section>
    </main>
  );
}