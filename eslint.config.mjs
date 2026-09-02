import eslint from "@eslint/js"

export default [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  eslint.configs.recommended,
]
