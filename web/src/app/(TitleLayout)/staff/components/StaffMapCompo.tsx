"use client";

import { Teacher } from "@/app/common/types";
import Image from "next/image";

interface StaffMapCompoProps{
  staff : Teacher[]
}

export default function StaffMapCompo({ staff } : StaffMapCompoProps){
  return(
    <div className="w-full flex items-center">
      <ul className="w-full flex flex-wrap mt-4 gap-6 ">
        {staff.map((item) => {
          return (
            <li
              key={item.id}
              className="w-70 xl:w-74 h-40 border-t-2 border-[#0C588D] bg-[#F6F6F6] mb-4 text-[#000000] flex flex-col justify-between"
            >
              <div className=" flex flex-col justify-center">
                <div className="p-2 h-8 ml-2 font-semibold">{item.position}</div>
                <div className="pl-4 pr-4 pt-4 text-xl font-semibold">
                  {item.name}
                </div>
                <div className="p-2 ml-2 font-semibold">
                  {item.role}
                </div>
              </div>
              <div className="w-full border-t-2 border-[#0C588D] font-bold h-8 flex items-center">
                <div className="h-8 ml-2 font-bold flex flex-row items-center gap-1 text-sm text-[#909090] overflow-hidden whitespace-nowrap">
                  <Image
                    alt="전화기 아이콘"
                    src="/images/telephone.png"
                    width={15}
                    height={15}
                    // className="mr-2"
                  />{" "}
                  {item.phone}
                  <Image
                    alt="이메일 아이콘"
                    src="/images/mail.png"
                    // className="mr-2"
                    width={15}
                    height={15}
                  />
                  {item.email}
                </div>                                      
              </div>                  
            </li>
          );
        })}
      </ul>
    </div>
  );
}