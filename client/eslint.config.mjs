import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            quotes: ["error", "double"],
            camelcase: ["error", { properties: "always" }],
            semi: ["error", "always"],
            indent: ["error", 4],
            "prettier/prettier": ["error"],
            "no-unused-vars": "error",
            ...tsPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...prettierPlugin.configs.recommended.rules,
        },
    },
    js.configs.recommended,
];
