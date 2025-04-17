"use client";

import React from "react";

type EditorTitleProps = {
  title : string,
  setTitle : React.Dispatch<React.SetStateAction<string>>
}

export default function EditorTitle({
  title,
  setTitle,
}:EditorTitleProps){

  return(
    <div className="flex">
      <div>
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
        Title
        </label>
      </div>
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
    </div>
  );
}