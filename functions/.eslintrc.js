module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    quotes: ["warn", "double"],
    indent: ["warn", 2],
    "object-curly-spacing": ["warn", "never"],
    "max-len": ["off"], // 🔥 Desactiva la longitud máxima de línea
  },
};
