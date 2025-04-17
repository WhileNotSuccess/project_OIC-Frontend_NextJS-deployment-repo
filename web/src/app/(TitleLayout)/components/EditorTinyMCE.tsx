"use client";

import { Language } from "@/app/common/types";
import { postError } from "@/app/menu";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Editor as EditorType } from "tinymce";

type EditorTinyMCEProps = {
  content : string,
  setContent : React.Dispatch<React.SetStateAction<string>>,
  customFormFetch : (url : string, options? : RequestInit) => Promise<Response>,
  language : Language,
}

export default function EditorTinyMCE({
  content,
  setContent,
  customFormFetch,
  language,
}:EditorTinyMCEProps){

  const editorRef = useRef<EditorType | null>(null); // tinymce를 직접 조작하는
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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


  return(
    <div>
      <section className="mt-1.5">
        <Editor
          tinymceScriptSrc={"/tinymce/tinymce.min.js"}
          id="tinymce-editor"
          value={content}
          onInit={( _, editor) => {
            editorRef.current = editor;
          }}
          init={{
            language: "ko_KR",
            relative_urls: false,
            remove_script_host: false,
            document_base_url: process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
              "/api",
              "",
            ),
            language_url: "/tinymce/langs/ko_KR.js",
            height: 500,
            plugins: ["lists", "link", "image", "table"],
            content_style: "p {margin:0} img{display:inline}",
            toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | table",
            file_picker_types: "image", // 파일 선택기에서 다룰 파일 형식
            file_picker_callback: (cb) => {
              const input = fileInputRef.current;
              input?.addEventListener("change", async (e) => {
                const target = e.target as HTMLInputElement;
                const imageFile = target.files ? target.files[0] : null;
                if (imageFile) {
                  const url = await handleFileSelect(imageFile);
                  if (url) {
                    cb(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
                      title: imageFile.name,
                    });
                  }
                }
              });
              input?.click();
            },
          }}
          onEditorChange={(item) => setContent(item)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="imageInput"
        />
      </section>
    </div>
  );
}