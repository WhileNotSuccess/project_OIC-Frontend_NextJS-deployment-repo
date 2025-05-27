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
          <article className="w-120 h-120 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
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
                className="float-right cursor-pointer relative"
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
            <section className="space-y-2 h-100 overflow-y-auto">
              {[
                { label: "이메일", icon: "📧", value: teacher.email },
                { label: "전화번호", icon: "📞", value: teacher.phone },

                { label: "팀 (한)", icon: "⛪", value: teacher.team },
                { label: "팀 (영)", icon: "⛪", value: teacher.team_en },
                { label: "팀 (일)", icon: "⛪", value: teacher.team_jp },

                { label: "역할 (한)", icon: "💻", value: teacher.role },
                { label: "역할 (영)", icon: "💻", value: teacher.role_en },
                { label: "역할 (일)", icon: "💻", value: teacher.role_jp },

                { label: "직책 (한)", icon: "💼", value: teacher.position },
                { label: "직책 (영)", icon: "💼", value: teacher.position_en },
                { label: "직책 (일)", icon: "💼", value: teacher.position_jp },
              ].map((item, index)=>(
                <div key={index} className="flex items-center text-gray-700 mb-2">
                  <div className="w-24">{item.label}</div>
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
