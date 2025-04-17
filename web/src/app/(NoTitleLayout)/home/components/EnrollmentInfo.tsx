"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import Image from "next/image";


export default function EnrollmentInfo() {
  const [entranceApplication, setEntranceApplication] = useState({
    applicationFileName: "",
    applicationImageName: "",
    guidelinesForApplicantsFileName: "",
    guidelinesForApplicantsImageName: "",
  });

  const customFetch = useCustomFetch();

  useEffect(() => {
    const entranceApplicationData = async () => {
      try {
        const response = await customFetch("/posts/main/applicants", {
          method: "GET",
        });
        const data = await response.json();
        setEntranceApplication(data);
      } catch (err) {
        console.error(err);
      }
    };
    entranceApplicationData();
  }, [customFetch]);

  return (
    <div className="w-full flex justify-center items-center gap-12 mt-12">
      <div className="flex flex-col w-64">
        <div
          className="text-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 text-lg rounded-lg"
          onClick={() => {

            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.applicationFileName}`;
          }}
        >
          입학신청
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.applicationImageName}`}
          alt="입학신청서 이미지"
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
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.guidelinesForApplicantsFileName}`;
          }}
        >
          모집요강
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.guidelinesForApplicantsImageName}`}
          alt="모집요강 이미지"
          width={2000}
          height={300}
          unoptimized={true}
          className="w-full h-64 object-cover mt-4"
        />
      </div>
    </div>
  );
}
