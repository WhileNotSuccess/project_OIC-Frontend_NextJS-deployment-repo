"use client";
import { default as useSWR } from "swr";
import { AuthMenu } from "../menu";
import { Language } from "../common/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useCheckAdmin = (userId? : number, category? : string) => {
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  const {
    data: user,
    isLoading,
  } = useSWR(
    "/users",
    async (endpoint) => {
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(AuthMenu[language].LoadError);
      }

      return response.json();
    },
    {
      refreshInterval: 60000 * 30,
    },
  );

  const {
    data: isAdmin,
    isLoading : isAdminLoading,
  } = useSWR(
    "/users/admin",
    async (endpoint) => {
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(AuthMenu[language].LoadError);
      }

      return response.json();
    },
    {
      refreshInterval: 60000 * 30,
    },
  );

  return {
    adminUserCheck : isAdmin?.result || category==="qna" && user,
    canEditOrDelete : isAdmin?.result || userId === user?.id,
    isAdminLoading,
    isLoading,
  };
};
