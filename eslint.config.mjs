import importPlugin from 'eslint-plugin-import-x';
import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.json'],
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    ignores: [
      'docs',
      '**/docs/**',
      '**/dist',
      'generated/prisma-client',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      quotes: ['error', 'single'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lodash',
              message: 'Use lodash-es instead for proper tree-shaking.',
            },
          ],
          patterns: [
            {
              group: ['lodash/*'],
              message: 'Use lodash-es instead for proper tree-shaking.',
            },
          ],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              bannedExternalImports: [
                '@vue/*',
                '@nestjs/*',
                '@anatine/zod-nestjs',
              ],
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:tool',
              bannedExternalImports: [],
              onlyDependOnLibsWithTags: ['scope:tool', 'scope:shared'],
            },
            {
              sourceTag: 'scope:feature',
              bannedExternalImports: [],
              onlyDependOnLibsWithTags: [
                'scope:tool',
                'scope:shared',
                'scope:feature',
              ],
            },
            {
              sourceTag: 'scope:api',
              bannedExternalImports: ['@vue/*'],
              onlyDependOnLibsWithTags: [
                'scope:api',
                'scope:shared',
                'scope:tool',
              ],
            },
            {
              sourceTag: 'scope:ui',
              bannedExternalImports: [
                '@nestjs/*',
                '@anatine/zod-nestjs',
                '@anatine/zod-openapi',
              ],
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:shared',
                'scope:tool',
              ],
            },
            {
              sourceTag: 'app:api',
              bannedExternalImports: ['@vue/*'],
              onlyDependOnLibsWithTags: [
                'scope:api',
                'scope:shared',
                'scope:tool',
                'scope:feature',
              ],
            },
            {
              sourceTag: 'app:ui',
              bannedExternalImports: [
                '@nestjs/*',
                '@anatine/zod-nestjs',
                '@anatine/zod-openapi',
              ],
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:shared',
                'scope:tool',
                'scope:feature',
              ],
            },
            {
              sourceTag: 'scope:ui',
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:shared',
                'scope:tool',
                'scope:generated',
              ],
            },
          ],
        },
      ],
      'import-x/default': 'off',
      'import-x/named': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/newline-after-import': ['error', { count: 1 }],
      'import-x/order': [
        'error',
        {
          named: true,
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@ghentcdh/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: ['external', 'internal', 'index', 'object'],
        },
      ],
    },
  },
];
