import nx from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  importPlugin.flatConfigs['recommended'],
  {
    ignores: ['**/dist', 'generated/prisma-client'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
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
          ],
        },
      ],
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': [
        'error',
        {
          named: true,
          // sortTypesAmongThemselves: true,
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
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
