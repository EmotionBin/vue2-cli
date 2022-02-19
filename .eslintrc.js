module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    window: "readonly",
    document: "readonly",
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: ["warn", "always"], // 分号必须
    quotes: ["warn", "single"], // 使用单引号
    "vue/html-quotes": [1, "double"], // html 使用双引号
    "jsx-quotes": ["warn", "prefer-double"], // jsx 使用双引号
    "quote-props": ["warn", "as-needed", {}], // 对象属性 必要时用单引号
    camelcase: "error", // 驼峰命名校验
    "vue/camelcase": "error",
    // 命名长度 开始
    "id-length": [
      "error",
      {
        exceptions: [
          "_",
          "a",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "m",
          "n",
          "t",
          "v",
          "x",
          "y",
          "z",
        ],
      },
    ],
    // 命名长度 结束
    // 空格 开始
    "array-bracket-spacing": "error",
    "arrow-spacing": "error",
    "block-spacing": "error",
    "key-spacing": "error",
    "object-curly-spacing": [1, "always"],
    "vue/mustache-interpolation-spacing": "warn",
    "brace-style": "error",
    // 空格 结束
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    "no-control-regex": "off",
    "no-prototype-builtins": "off",
    "vue/component-name-in-template-casing": "error",
    "vue/name-property-casing": ["error", "kebab-case"],
    "vue/match-component-file-name": "error",
    "vue/no-use-v-if-with-v-for": [
      2,
      {
        allowUsingIterationVar: false,
      },
    ],
    "vue/no-parsing-error": [
      0,
      {
        "x-invalid-end-tag": false,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: false,
      },
    ],
    "@typescript-eslint/no-explicit-any": ["off"],
    // prettier 校验规则 开始
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
        trailingComma: "es5",
        quoteProps: "as-needed",
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        printWidth: 80,
        jsxBracketSameLine: true,
        arrowParens: "avoid",
        proseWrap: "preserve",
        htmlWhitespaceSensitivity: "ignore",
        jsxSingleQuote: false,
        vueIndentScriptAndStyle: true,
        embeddedLanguageFormatting: "auto",
        insertPragma: false,
        requirePragma: false,
      },
    ],
    // prettier 校验规则 结束
  },
};
