import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,

  // TypeScript 권장 설정
  ...tseslint.configs.recommended,

  // Next.js 권장 설정 (flat config용)
  {
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Next 권장 규칙
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // React Hooks 권장 규칙
      ...reactHooks.configs.recommended.rules,
      "react-hooks/set-state-in-effect": "off",

      "react-hooks/immutability": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",

      // 사용자님 커스텀 규칙
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "max-len": ["error", { code: 350 }],
    },
  },

  // 빌드 산출물/캐시 무시
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**", "public/**", "next.config.mjs",
    "eslint.config.mjs"],
  },
];
