"use client";

import {
  TeacherGlobal,
} from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import BoardPageCompo from "../../components/BoardPageCompo";
import StaffComponent from "./StaffComponent";
import StaffModal from "./StaffModal";
import Title from "../../components/Title";
import PrideOfYJU from "./PrideOfYJU";
import GlobalPrograms from "./GlobalPrograms";
import Countries from "./Countries";
import Institutions from "./Institutions";

type AdminComponentProps = {
  category: string;
};

export default function AdminComponent({ category }: AdminComponentProps) {
  const customFetch = useCustomFetch();
  const [allStaff, setAllStaff] = useState<Record<string, TeacherGlobal[]>>({});
  const [staffPostModal, setStaffPostModal] = useState<boolean>(false);
  console.log(allStaff);
  useEffect(() => {
    if (category === "staff") {
      async function getStaff() {
        const response = await customFetch("/staff/admin");
        const data = await response.json();
        setAllStaff(data.data);
      }
      getStaff();
      
    }
  }, [category]);

  const saveOrder = async () => {
    const sortedStaff: Record<string, { id: number; order: number }[]> = {};
    Object.entries(allStaff).map(([key, value]) => {
      sortedStaff[key] = value.map((item, index) => {
        return {
          id: item.id,
          order: index,
        };
      });
    } );
    console.log(sortedStaff);
    try {
      const response = await customFetch("/staff/order", {
        method: "POST",
        body: JSON.stringify({ orders:sortedStaff }),
      });
      await response.json();
      
      alert("순서가 저장되었습니다.");
      
      
    } catch (error) {
      console.error("Error saving order:", error);
      alert("순서 저장 중 오류가 발생했습니다.");
    }
  };

  if (category === "staff") {
    return (
      <>
        {staffPostModal && (
          <StaffModal
            onClose={() => {
              setStaffPostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap justify-between px-12">
          <h1 className="text-3xl mb-4 font-bold text-center w-full">
            교직원 소개
            <span className="p-4 text-right">
              <button
                onClick={() => {
                  setStaffPostModal(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                추가하기
              </button>
            </span>
            <span className="p-4 text-right">
              <button
                onClick={() => {
                  saveOrder();
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                순서 저장하기
              </button>
            </span>
          </h1>
          {
            Object.entries(allStaff).map(([key, value]) => (  // 구조분해 할당으로 새로운 배열 반환
              <div key={key} className="mb-8">
                <div className="text-2xl font-bold mb-2">
                  {key}
                </div>
                <StaffComponent item={value} onOrderChange={(newStaff)=>{
                  setAllStaff((prev)=>({
                    ...prev,[key]: newStaff,
                  }));
                }}/>
              </div>
            ),
            )
          }
        </div>
      </>
    );
  } else if (category == "PrideOfYJU") {
    return (
      <PrideOfYJU />
    );
  } else if (category == "global-programs") {
    return (
      <GlobalPrograms />
    );
  } else if (category == "countries") {
    return (
      <Countries />
    );
  } else if (category == "institutions") {
    return (
      <Institutions />
    );
  } else {
    return (
      <div className="w-full flex flex-col">
        <Title category={category} />
        <div className="w-full flex justify-center items-center">
          <BoardPageCompo name={category} />
        </div>
      </div>

    );
  }
}
