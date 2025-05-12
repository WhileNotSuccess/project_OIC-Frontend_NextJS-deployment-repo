"use client";
import { TeacherGlobal } from "@/app/common/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import StaffModal from "./StaffModal";

interface StaffComponentProps {
  item: TeacherGlobal[];
}

// item은 국제교류원, 국제교류팀, 중국센터 배열의 값
export default function StaffComponent({ item }: StaffComponentProps) {
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [updateModalId, setUpdateModalId] = useState<number | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

  return (
    <>
      {item.map((teacher) => (
        <section className="flex mb-4" key={teacher.id}>
          {updateModalId === teacher.id && (
            <StaffModal
              onClose={() => setUpdateModalId(null)}
              data={teacher}
              method="PATCH"
            />
          )}
          {deleteModalId === teacher.id && (
            <DeleteModal
              onClose={() => setDeleteModalId(null)}
              id={teacher.id}
              target="staff"
            />
          )}
          <article className="w-66 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <header className="w-full relative">
              <h2 className="text-blue-500 font-bold text-lg inline-block">
                {teacher.name}
              </h2>
              <span
                onClick={() =>
                  setActiveMenuId((prev) =>
                    prev === teacher.id ? null : teacher.id,
                  )
                }
                className="float-right cursor-pointer"
              >
                ㅤㅤ⋮
              </span>
              {activeMenuId === teacher.id && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded shadow-lg z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      onClick={() => setDeleteModalId(teacher.id)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      삭제
                    </li>
                    <li
                      onClick={() => setUpdateModalId(teacher.id)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      수정
                    </li>
                  </ul>
                </div>
              )}
            </header>

            <hr className="my-2 border-gray-300" />
            <section className="space-y-2 h-30 overflow-y-auto">
              {[
                { icon : "📧", value : teacher.email },
                { icon : "📞", value : teacher.phone },
                { icon : "⛪", value : teacher.team },
                { icon : "💻", value : teacher.role },
                { icon : "💼", value : teacher.position },
                { icon : "⛪", value : teacher.team_en },
                { icon : "💻", value : teacher.role_en },
                { icon : "💼", value : teacher.position_en },
                { icon : "⛪", value : teacher.team_jp },
                { icon : "💻", value : teacher.role_jp },
                { icon : "💼", value : teacher.position_jp },
              ].map((item, index)=>(
                <div key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">{item.icon}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </section>
          </article>
        </section>
      ))}
    </>
  );
}
