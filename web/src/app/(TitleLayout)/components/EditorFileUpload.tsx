"use client";
import { Language } from "@/app/common/types";
import { SelectPageCompoMenu } from "@/app/menu";
import Image from "next/image";

type EditorFileUploadProps = {
  setDocumentFiles : React.Dispatch<React.SetStateAction<Array<File>>>;
  deleteFileNames : Array<string>;
  setDeleteFileNames : React.Dispatch<React.SetStateAction<Array<string>>>;
  language : Language
  documentFileNames : Array<string>;
  setDocumentFileNames : React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function EditorFileUploadCompo({
  setDocumentFiles,
  deleteFileNames,
  setDeleteFileNames,
  language,
  documentFileNames,
  setDocumentFileNames,
}:EditorFileUploadProps){

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFileNames = filesArray.map((file) => file.name);
      setDeleteFileNames((prev) =>
        prev.filter((name) => !newFileNames.includes(name)),
      );
      setDocumentFiles((prev) => [...prev, ...filesArray]);
      setDocumentFileNames((prev) => [
        ...prev,
        ...filesArray.map((file) => file.name),
      ]); // 파일 이름을 저장
    }
  };

  const addDeleteFileName = (fileName: string) => {
    setDocumentFiles((prev) => prev.filter((file) => file.name !== fileName));
    setDocumentFileNames((prev) => prev.filter((name) => name !== fileName));
    setDeleteFileNames((prev) => [...prev, fileName]);
  };  

  return(
    <div>
      <div className="w-full flex justify-between items-center">
        <section className="w-[50%]">
          <label className="w-full text-xs  bg-blue-500 text-white p-2 rounded-md">
            {SelectPageCompoMenu[language].fileSelect}
            <input
              type="file"
              accept=".*"
              multiple
              onChange={handleDocumentFileChange}
              className="hidden"
            />
          </label>
      
          <ul className={documentFileNames.length > 0 ? "border mt-4" : ""}>
            {documentFileNames.map((fileName, index) => (
              <div
                key={index}
                className={`flex justify-between items-center ${
                  deleteFileNames.includes(fileName) ? "hidden" : ""
                }`}
              >
                <div className="flex flex-rows items-center">
                  <Image
                    src="/images/attachFile.png"
                    alt=""
                    width={96}
                    height={96}
                    className="size-4 flex justify-center items-center mr-4"
                  />
                  <li>
                    {fileName.match(/^\d{8}-\d{6}_/)
                      ? fileName.substring(16)
                      : fileName}
                  </li>
                </div>
                <Image
                  src="/images/xbutton.png"
                  alt=""
                  width={96}
                  height={96}
                  className="size-4 cursor-pointer"
                  onClick={() => addDeleteFileName(fileName)}
                />
              </div>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}