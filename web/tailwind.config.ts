import type { Config } from "tailwindcss";

const config:Config = {
  content:[ // 스캔할 파일 이름 설정
    "./src/**/*.{ts,tsx}", // src폴더 아래 전체 파일들 적용
  ],
  darkMode:"media", // 기기 설정에 따라 자동으로 다크모드 적용, class는 html에 class="dark" 라고 명시해야함
};

export default config;