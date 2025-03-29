import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import stylistic from "@stylistic/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
        prettier,
        "@stylistic": stylistic,
    },

    rules: {
        "prettier/prettier": "error",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-console": "warn",
        "@stylistic/semi": ["error", "never"],
    },
}]);