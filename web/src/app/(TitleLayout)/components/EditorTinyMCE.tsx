"use client";

import { Language } from "@/app/common/types";
import { postError, YoutubeMessage } from "@/app/menu";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Editor as EditorType } from "tinymce";

type EditorTinyMCEProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  customFormFetch: (url: string, options?: RequestInit) => Promise<Response>;
  language: Language;
};

export default function EditorTinyMCE({
  content,
  setContent,
  customFormFetch,
  language,
}: EditorTinyMCEProps) {
  const editorRef = useRef<EditorType | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const data = await customFormFetch("/attachments", {
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

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div>
      <section className="mt-1.5">
        <Editor
          tinymceScriptSrc={"/tinymce/tinymce.min.js"}
          id="tinymce-editor"
          value={content}
          onInit={(_, editor) => {
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
            plugins: ["lists", "link", "image", "table", "code"],
            content_style: "p {margin:0} img{display:inline}",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | table | youtubeButton | code",
            file_picker_types: "image",
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
            setup: (editor) => {
              editor.ui.registry.addButton("youtubeButton", {
                text: "YouTube",
                icon: "embed",
                onAction: () => {
                  editor.windowManager.open({
                    title: "Insert YouTube Video",
                    body: {
                      type: "panel",
                      items: [
                        {
                          type: "input",
                          name: "youtubeUrl",
                          label: "YouTube URL",
                        },
                      ],
                    },
                    buttons: [
                      {
                        type: "cancel",
                        text: "Cancel",
                      },
                      {
                        type: "submit",
                        text: "Insert",
                        primary: true,
                      },
                    ],
                    onSubmit: (api) => {
                      const data = api.getData();
                      const videoId = getYouTubeVideoId(data.youtubeUrl);
                      if (videoId) {
                        const iframeHtml = `<iframe src="https://www.youtube.com/embed/${videoId}" 
                                                    frameborder="0" allowfullscreen
                                                    style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%); width:90%;height:90%;"
                                            >
                                            </iframe>`;
                        editor.insertContent(iframeHtml);
                      } else {
                        alert(YoutubeMessage[language]?.invalidLink);
                      }
                      api.close();
                    },
                  });
                },
              });
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
