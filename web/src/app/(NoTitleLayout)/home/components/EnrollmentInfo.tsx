"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import Image from "next/image";
import { enrollmentInfoMessage } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function EnrollmentInfo() {
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);



  const [entranceApplication, setEntranceApplication] = useState({
    /* applicationFileName: "",
    applicationImageName: "",
    guidelinesForApplicantsFileName: "",
    guidelinesForApplicantsImageName: "", */

    applicants: {
      fileUrl: "",
      imageUrl: "",
    },
    entry: {
      fileUrl: "",
      imageUrl: "",
    },
  });

  const customFetch = useCustomFetch();

  useEffect(() => {
    const entranceApplicationData = async () => {
      try {
        const response = await customFetch("/post/main/applicants", {
          method: "GET",
        });
        const data = await response.json();
        setEntranceApplication(data);
      } catch {
        console.error(enrollmentInfoMessage[language].EnrollmentLoadingError);
      }
    };
    entranceApplicationData();
  }, []);

  return (
    <div className="w-full flex justify-center items-center gap-12 mt-12">
      <div className="flex flex-col w-64">
        <div
          className="text-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 text-lg rounded-lg"
          onClick={() => {

            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${entranceApplication.applicants.fileUrl}`;
          }}
        >
          {enrollmentInfoMessage[language].RecruitmentGuidelines}
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${entranceApplication.applicants.imageUrl}`}
          alt={enrollmentInfoMessage[language].RecruitmentGuidelines}
          width={2000}
          height={300}
          unoptimized={true}
          className="w-full h-64 object-cover mt-4"
        />
      </div>
      <div className="flex flex-col w-64">
        <div
          className="text-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 text-lg rounded-lg"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${entranceApplication.entry.fileUrl}`;
          }}
        >
          {enrollmentInfoMessage[language].ApplicationForm}
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${entranceApplication.entry.imageUrl}`}
          alt={enrollmentInfoMessage[language].ApplicationForm}
          width={2000}
          height={300}
          unoptimized={true}
          className="w-full h-64 object-cover mt-4"
        />
      </div>
    </div>
  );
}
