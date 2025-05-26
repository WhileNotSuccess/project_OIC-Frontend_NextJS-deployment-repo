"use client";

import { Language } from "@/app/common/types";
import { categoryList } from "@/app/menu";

type EditorCategoryLanguageProps = {
  category : string,
  setCategory : React.Dispatch<React.SetStateAction<string>>,
  language : Language,
  setLanguage : React.Dispatch<React.SetStateAction<Language>>,
}

export default function EditorCategoryLanguage({
  category,
  setCategory,
  language,
  setLanguage,
}:EditorCategoryLanguageProps){
  return(
    <div className="w-full flex flex-col sm:flex-row justify-between  border mb-1">
      <select
        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 
                text-sm font-medium text-center text-gray-900 bg-gray-100 border 
                border-e-0 border-gray-300 dark:border-gray-700 dark:text-white 
                rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none 
                focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
                All categories
        {categoryList[language].map((item) => (
          <option
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            key={item.key}
            value={item.key}
          >
            {item.value}
          </option>
        ))}
      </select>

      <select
        className="border rounded-sm cursor-pointer"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        {Object.values(Language).map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}