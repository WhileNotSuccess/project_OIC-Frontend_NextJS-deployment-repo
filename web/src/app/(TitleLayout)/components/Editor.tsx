"use client";

import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Language, ServerDocumentFile } from "@/app/common/types";
import EditorFileUploadCompo from "./EditorFileUpload";
import EditorTitle from "./EditorTitle";
import EditorCategoryLanguage from "./EditorCategoryLanguage";
import EditorTinyMCE from "./EditorTinyMCE";
import { editorCompo, postError } from "@/app/menu";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import useCustomFetch from "@/app/hook/customFetch";
import { Editor as EditorType } from "tinymce";
import EditorButton from "./EditorButton";

type EditorProps = {
  id?: string;
  categoryName?: string;
  content?: string;
  title?: string;
};

export default function Editor(props: EditorProps){
  const editorRef = useRef<EditorType | null>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
        const response = await customFetch(`/posts?id=${props.id}`, {
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


  const onFormDataAppend = ()=>{
    const formData = new FormData();
    formData.append("title",title);
    formData.append("content",content);
    formData.append("category", category);
    formData.append("language", language);
    documentFiles.forEach((file) => {
      formData.append("files", file); // 문서 파일도 함께 전송
    });
    return formData;
  };

  const handleFileSelect = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const data = await customFormFetch("/attachments", {
          // 주소 바꿔야함, body랑 헤더를 커스텀 함수를 만들어서 보내는걸로로 변경해야함
  
          method: "POST",
          body: formData,
        });
        const imageUrl = decodeURIComponent(data.url);
        return imageUrl;
      } catch {
        alert(postError[language]?.imgError);
      }
    }
  };

  const onCheckTitleContent = ()=>{
    if(title===""){
      alert(editorCompo[language].needInputTitle);
      return false;
    }
    if(content===""){
      alert(editorCompo[language].needInputContent);
      return false;
    }
    return true;
  };

  return(
    <main className="w-full flex justify-center">
      <section style={{ width: "75%" }} className="mt-4">
        <EditorTitle
          title={title}
          setTitle={setTitle}/>
        {/* EditorCategoryLanguage는 추후에 관리자인지 확인하는 3항이나 조건문이 필요함 */}
        <EditorCategoryLanguage
          category={category}
          setCategory={setCategory}
          language={language}
          setLanguage={setLanguage}
        />
        <section style={{ width: "75%" }} className="mt-4">
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
          editorRef={editorRef}
          fileInputRef={fileInputRef}
          handleFileSelect={handleFileSelect}
        />
        <EditorButton
          deleteFileNames={deleteFileNames}
          onCheckTitleContent={onCheckTitleContent}
          onFormDataAppend={onFormDataAppend}
          customFetch={customFetch}
          id={props.id}
          language={language}
        />
      </section>
    </main>
  );
}