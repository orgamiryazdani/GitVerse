import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'next',
      'prettier',
      'plugin:prettier/recommended',
    ],
    plugins: ['prettier'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off',
      'max-params': ['error', 3],
      'prettier/prettier': 'error',
    },
  }),
];

export default eslintConfig;