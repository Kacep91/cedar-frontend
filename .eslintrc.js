module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["d3-shape.js"],
  extends: ["eslint:recommended", "plugin:react/recommended", "react-app"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["react"],
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "react/no-children-prop": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
