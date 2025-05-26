"use client";

import { Language } from "@/app/common/types";
import { editorCompo, postError, postSuccess, updateError, updateSuccess } from "@/app/menu";



type EditorButtonProps = {
  deleteFileNames : string[],
  customFormFetch: (url: string, options?: RequestInit) => Promise<Response>;
  id? : string,
  language : Language,
  title : string,
  content : string,
  category : string,
  documentFiles : File[],
}


export default function EditorButton({
  id,
  customFormFetch,
  language,
  deleteFileNames,
  title,
  content,
  category,
  documentFiles,
}:EditorButtonProps){


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
      const formData = onFormDataAppend();
      const response = await customFormFetch("/post",{
        method : "POST",
        body : formData,
      });
      if(response.ok){
        alert(postSuccess[language]?.contentPost);
      }
      else{
        alert(postError[language]?.subError);        
      }
    }catch{
      alert(postError[language]?.subError);
    }
  };

  const onUpdate = async () =>{
    if(!onCheckTitleContent()) return;
    try{
      const formData = onFormDataAppend();
      formData.append("deleteFilePath", JSON.stringify(deleteFileNames));
      await customFormFetch(`/post/${id}`,{
        method : "PATCH",
        body : formData,
      });
      alert(updateSuccess[language]?.updatePost);
    }catch{
      alert(updateError[language]?.update);
    }
  };
  return(
    <div>
      {id ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={onUpdate}
        >
          {editorCompo[language]?.update}
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={onSubmit}
        >
          {editorCompo[language]?.submit}
        </button>
      )}
    </div>
  );
}