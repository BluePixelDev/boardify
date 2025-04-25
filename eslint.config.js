import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-plugin-prettier/recommended";

const baseTsConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended
);

export default defineConfig([
  globalIgnores(["node_modules/**", "build/**", "src-tauri/**"]),
  baseTsConfig,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
]);
