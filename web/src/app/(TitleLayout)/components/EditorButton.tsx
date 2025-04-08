"use client";

import { Language } from "@/app/common/types";
import { editorCompo, postError, postSuccess, updateError, updateSuccess } from "@/app/menu";



type EditorButtonProps = {
  deleteFileNames : string[],
  onCheckTitleContent : ()=>boolean,
  onFormDataAppend : ()=> FormData,
  customFetch : (url : string, options? : RequestInit) => Promise<Response>,
  id? : string,
  language : Language,
}


export default function EditorButton({
  id,
  onCheckTitleContent,
  onFormDataAppend,
  customFetch,
  language,
  deleteFileNames,
}:EditorButtonProps){

  const onSubmit = async () =>{
    if(!onCheckTitleContent()) return;
    try{
      const formData = onFormDataAppend();
      await customFetch("/posts",{
        method : "POST",
        body : formData,
      });
      alert(postSuccess[language]?.contentPost);
    }catch{
      alert(postError[language]?.subError);
    }
  };

  const onUpdate = async () =>{
    if(!onCheckTitleContent()) return;
    try{
      const formData = onFormDataAppend();
      formData.append("deleteFilePath", JSON.stringify(deleteFileNames));
      await customFetch(`/posts/${id}`,{
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