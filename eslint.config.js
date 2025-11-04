import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.Config[] } */

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,

  // global ignore pattern
  { ignores: ["**/.astro/*", "**/env.d.ts"] },

  // global settings
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.browser,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    // global rules
    rules: {
      // @typescript-eslint rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      // eslint rule for astro
      "astro/no-set-html-directive": "error",
      // eslint rule for simple-import-sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // NOTE: side effect import should be sorted by manually.

            // stylesheet
            ["\\.(sass|scss|css)$"],

            // astro built-in components
            ["astro:(.*)$"],

            // static assets imports
            ["asset(s)?"],

            // local components
            ["layout(s)?", "component(s)?"],
          ],
        },
      ],
    },
  },
];
