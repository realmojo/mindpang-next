import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow setState calls within useEffect - this is a common React pattern
      // for initializing state from localStorage, API calls, etc.
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      // Disable strict purity checks - Math.random and similar functions are
      // acceptable when called within event handlers or useEffect
      "react-hooks/purity": "off",
      // Allow setState in useEffect for initialization patterns
      "react-hooks/set-state-in-effect": "off",
      // Allow manual memoization that React Compiler might not understand
      "react-hooks/preserve-manual-memoization": "off",
      // Reduce exhaustive-deps to warning only (common false positives)
      "react-hooks/exhaustive-deps": "warn",
      // Allow unused variables prefixed with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Allow img tag usage (disabled Image component requirement)
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
