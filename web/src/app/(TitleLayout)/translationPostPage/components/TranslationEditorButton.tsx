"use client";

import { Language } from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { editorCompo, postError } from "@/app/menu";



type EditorButtonProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTranslationResult: (result: { en: string; ja: string }) => void;
  language : Language,
  title : string,
  content : string,
}


export default function TranslationEditorButton({
  setIsModalOpen,
  setIsLoading,
  setTranslationResult,
  language,
  title,
  content,
}:EditorButtonProps){

  
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

  const onSubmit = async () =>{
    if(!onCheckTitleContent()) return;
    try{
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_TRANSLATION_URL}/translate`,{
        headers:{
          "Content-Type": "application/json",
        },
        method : "POST",
        body : JSON.stringify({
          title,
          content,
        }),
      });
      if(response.ok){
        const data = await response.json();
        setTranslationResult({
          en: data.translated_html_en,
          ja: data.translated_html_ja,
        });
      }
      else{
        alert(postError[language]?.subError);        
      }
    }catch{
      alert(postError[language]?.subError);
    }finally{
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  return(
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        onClick={onSubmit}
      >
        {editorCompo[language]?.submit}
      </button>
    </div>
  );
}