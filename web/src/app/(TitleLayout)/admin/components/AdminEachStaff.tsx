import { TeacherGlobal } from "@/app/common/types";
import StaffModal from "./StaffModal";
import DeleteModal from "./DeleteModal";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface AdminEachStaffProps {
    staff: TeacherGlobal;
    activeMenuId: number | null;
    setActiveMenuId: (id: number | null) => void;
    updateModalId: number | null;
    setUpdateModalId: (id: number | null) => void;
    deleteModalId: number | null;
    setDeleteModalId: (id: number | null) => void;
}

export default function AdminEachStaff({ staff, activeMenuId, setActiveMenuId, updateModalId, setUpdateModalId, deleteModalId, setDeleteModalId }:AdminEachStaffProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: String(staff.id) });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <section ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex mb-4" 
    >
      {updateModalId === staff.id && (
        <StaffModal
          onClose={() => setUpdateModalId(null)}
          data={staff}
          method="PATCH"
        />
      )}
      
      {deleteModalId === staff.id && (
        <DeleteModal
          onClose={() => setDeleteModalId(null)}
          id={staff.id}
          target="staff"
        />
      )}
      <article className="w-120 h-120 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <header className="w-full relative">
          <h2 className="text-blue-500 font-bold text-lg inline-block">
            {staff.name}
          </h2>
          <span
            onClick={() =>
              setActiveMenuId(
                activeMenuId === staff.id ? null : staff.id,
              )
            }
            className="float-right cursor-pointer relative"
          >
                ㅤㅤ⋮
          </span>
          {activeMenuId === staff.id && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded shadow-lg z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  onClick={() => setDeleteModalId(staff.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                      삭제
                </li>
                <li
                  onClick={() => setUpdateModalId(staff.id)}
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
            { label: "이메일", icon: "📧", value: staff.email },
            { label: "전화번호", icon: "📞", value: staff.phone },

            { label: "팀 (한)", icon: "⛪", value: staff.team },
            { label: "팀 (영)", icon: "⛪", value: staff.team_en },
            { label: "팀 (일)", icon: "⛪", value: staff.team_jp },

            { label: "역할 (한)", icon: "💻", value: staff.role },
            { label: "역할 (영)", icon: "💻", value: staff.role_en },
            { label: "역할 (일)", icon: "💻", value: staff.role_jp },

            { label: "직책 (한)", icon: "💼", value: staff.position },
            { label: "직책 (영)", icon: "💼", value: staff.position_en },
            { label: "직책 (일)", icon: "💼", value: staff.position_jp },
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
  );

}
    