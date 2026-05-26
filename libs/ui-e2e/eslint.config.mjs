import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.mjs';
import playwright from 'eslint-plugin-playwright';

export default [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/specs/**/*.ts'],
  },
];
