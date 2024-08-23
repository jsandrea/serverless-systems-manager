import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["lib/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.jest,
        ...globals.browser,
      } 
    },
  },
  pluginJs.configs.recommended,
];