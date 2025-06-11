"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import EditorFileUploadCompo from "../../components/EditorFileUpload";
import EditorTitle from "../../components/EditorTitle";
import EditorCategoryLanguage from "../../components/EditorCategoryLanguage";
import EditorTinyMCE from "../../components/EditorTinyMCE";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import { useCheckAdmin } from "@/app/hook/canEditOrDelete";
import TranslationEditorButton from "./TranslationEditorButton";
import LoadingModal from "./LoadingModal";
import TranslationUpdateModal from "./TranslationUpdateModal";
import TranslationModal from "./TranslationModal";

type EditorProps = {
  id?: string;
  categoryName: string;
};

export default function TranslationEditor(props: EditorProps){
  const [content, setContent] = useState<string>("");
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [documentFiles, setDocumentFiles] = useState<Array<File>>([]); // 파일 저장을 위한 상태
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]); // 삭제할 파일 이름 리스트
  const customFormFetch = useCustomFormFetch();
  const [category, setCategory] = useState<string>(props.categoryName || "");
  const [language, setLanguage] = useState<Language>(Language.korean);
  const { adminUserCheck } = useCheckAdmin();

  const [translationResult, setTranslationResult] = useState({
    en:"",
    ja:"",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jaUpdate, setJaUpdate] = useState<boolean>(false);
  const [enUpdate, setEnUpdate] = useState<boolean>(false);
  
  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);



  return(
    <main className="w-full flex justify-center px-12">
      { isLoading && <LoadingModal/>}
      {(enUpdate || jaUpdate) && (
        <TranslationUpdateModal
          onClose={() => {
            setEnUpdate(false);
            setJaUpdate(false);
            setIsModalOpen(true);
          }}
          content={enUpdate ? translationResult.en : translationResult.ja}
          setContent={enUpdate ? (item:string)=>setTranslationResult(prev=>({ ...prev,en:item })) : (item:string)=>setTranslationResult(prev=>({ ...prev,ja:item }))}
          language={language}
        />
      )}
      {translationResult.en.length>0 && isModalOpen && 
        <TranslationModal onClose={()=>{setIsModalOpen(false);}} 
          enUpdate={()=>{
            setEnUpdate(true);
            setIsModalOpen(false);
          }} 
          jaUpdate={()=>{
            setJaUpdate(true);
            setIsModalOpen(false);
          }} 
          htmlEn={translationResult.en} htmlJa={translationResult.ja}
          title={title}
          documentFiles={documentFiles}
          category={category}
          content={content}
        />
      }
      <section style={{ width: "100%" }} className="mt-4">
        <EditorTitle
          title={title}
          setTitle={setTitle}/>
        {adminUserCheck &&         
        <EditorCategoryLanguage
          category={category} // oldPost에서도 상태관리가 있어서 안뺌
          setCategory={setCategory}
          language={language}
          setLanguage={setLanguage}
        />}

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
        <TranslationEditorButton
          setIsModalOpen={setIsModalOpen}
          setIsLoading={setIsLoading}
          setTranslationResult={setTranslationResult}
          language={language}
          title={title}
          content={content}
        />
      </section>
    </main>
  );
}