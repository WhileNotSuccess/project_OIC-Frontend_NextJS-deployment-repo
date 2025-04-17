"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/hook/customFetch";
import { CheckAdminAlert } from "@/app/menu";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";

const CheckAdmin = () => {
  const router = useRouter();
  const fetch = useCustomFetch();

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;

    async function check() {
      const response = await fetch("/users");
      const data = await response.json();
      if (data && !data.result) {
        alert(CheckAdminAlert[savedLanguage].noPermission);
        router.push("/");
      }
    }
    check();
  }, [fetch, router]);

  return null;
};

export default CheckAdmin;
