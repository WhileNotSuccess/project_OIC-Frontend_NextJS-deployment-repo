import { createPortal } from "react-dom";
import useCustomFormFetch from "@/app/hook/customFormFetch";
import EditorTinyMCE from "../../components/EditorTinyMCE";
import { Language } from "@/app/common/types";

type ModalProps = {
  onClose: () => void;
  content: string;
  setContent: (item:string) => void;
  language:Language
};

export default function TranslationUpdateModal({ onClose, content, setContent, language }: ModalProps) {
  const customFormFetch = useCustomFormFetch();
  
  return createPortal(
    <dialog open
      tabIndex={-2}
      className="border-2 border-solid fixed w-full h-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-2/3 h-3/4 overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
          ✖
          </button>
          
          <EditorTinyMCE
            content={content}
            setContent={setContent}
            customFormFetch={customFormFetch}
            language={language}
            id="translation-update-editor"
          />
          
        </div>
      </div>
        
    </dialog>,
    document.body,
  );
}
