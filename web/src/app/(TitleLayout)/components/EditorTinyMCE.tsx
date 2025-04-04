"use client";

import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";

type EditorTinyMCEProps = {
  content : string,
  setContent : React.Dispatch<React.SetStateAction<string>>,
  editorRef : React.MutableRefObject<EditorType | null>,
  fileInputRef : React.RefObject<HTMLInputElement>,
  handleFileSelect : (file : File)=> Promise<string|undefined>
}

export default function EditorTinyMCE({
  content,
  setContent,
  editorRef,
  fileInputRef,
  handleFileSelect,
}:EditorTinyMCEProps){
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