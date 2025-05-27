import { TeacherGlobal } from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  method: string;
  data?: TeacherGlobal;
};

type Mapping ={
  [key: string]: string;
}

export default function StaffModal({ onClose, data, method }: ModalProps) {
  const keyMapping:Mapping = {
    name: "이름 👤",
    email: "이메일 📧",
    phone: "전화번호 📞",

    team: "팀 (한) ⛪",
    team_en: "팀 (영) ⛪",
    team_jp: "팀 (일) ⛪",

    role: "역할 (한) 💻",
    role_en: "역할 (영) 💻",
    role_jp: "역할 (일) 💻",

    position: "직책 (한) 💼",
    position_en: "직책 (영) 💼",
    position_jp: "직책 (일) 💼",
  };
  const [inputs, setInputs] = useState<TeacherGlobal>(
    data
      ? data
      : {
        id: 0,
        name: "",
        position: "",
        phone: "",
        email: "",
        team:"",
        role : "",
        team_jp : "",
        role_jp : "",
        position_jp : "",
        team_en : "",
        role_en : "",
        position_en : "",
      },
  );

  const customFetch = useCustomFetch();
  const { id, ...noIdInputs } = inputs;

  const onSubmit = async () => {
    const response = await customFetch(
      method == "POST" ? "/staff" : `/staff/${id}`,
      {
        method: method,
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          phone: inputs.phone,
          position: inputs.position,
          team : inputs.team,
          role : inputs.role,
          team_jp : inputs.team_jp,
          role_jp : inputs.role_jp,
          position_jp : inputs.position_jp,
          team_en : inputs.team_en,
          role_en : inputs.role_en,
          position_en : inputs.position_en,
        }),
      },
    );

    if (response) {
      alert("교직원 수정에 성공했습니다.");
      window.location.href = location.href;
    }
  };

  return createPortal(
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg h-200 overflow-auto dark:bg-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        {
          Object.entries(noIdInputs).map(([key,value])=>(
            <div key={key}>
              <label
                htmlFor={key}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                {keyMapping[key] || key}
              </label>
              <input
                value={value || ""}
                onChange={(e) => {
                  setInputs((prev) => ({ ...prev, [key]: e.target.value }));
                }}
                type="text"
                id={key}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          ))
        }
        {/* <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          email
        </label>

        <input
          value={inputs.email || ""}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, email: e.target.value }));
          }}
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          phone
        </label>

        <input
          value={inputs.phone || ""}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, phone: e.target.value }));
          }}
          type="text"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          name
        </label>

        <input
          value={inputs.name}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, name: e.target.value }));
          }}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="position"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          position
        </label>

        <input
          value={inputs.position}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, position: e.target.value }));
          }}
          type="text"
          id="position"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        /> */}
        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {method == "POST" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
