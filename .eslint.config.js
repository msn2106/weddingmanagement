/**
 * Production-grade ESLint flat config for monorepo:
 * - Next.js (frontend) + React (web/mobile planned)
 * - NestJS (backend) + Node
 * - TurboRepo monorepo layout: apps/frontend, apps/backend, packages/*
 *
 * DevDependencies you should have installed (example):
 * npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-unused-imports eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-plugin-jest eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-react-native eslint-config-next
 *
 * Adjust to taste (enable/disable rules, change parserOptions.project globs).
 */

module.exports = [
  // ========== Ignore files/folders common to monorepo ==========
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      'coverage/**',
      'public/**',
      'scripts/**',
      // turbo cache or workspace artifacts
      '.turbo/**',
      // optional generated Prisma client or migrations
      'prisma/**/migrations/**',
    ],
  },

  // ========== Base JS/TS rules (applies to all files) ==========
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // Point to all tsconfigs used in the repo for type-aware rules
        project: [
          './tsconfig.json',
          './apps/frontend/tsconfig.json',
          './apps/backend/tsconfig.json',
          // add package tsconfigs if present
          './packages/*/tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      import: require('eslint-plugin-import'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      'unused-imports': require('eslint-plugin-unused-imports'),
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
      'testing-library': require('eslint-plugin-testing-library'),
      jest: require('eslint-plugin-jest'),
      prettier: require('eslint-plugin-prettier'),
      'react-native': require('eslint-plugin-react-native'),
    },

    rules: {
      /***********************
       * Core TypeScript rules
       ***********************/
      // Use the recommended set but turn off conflicting ones with Prettier
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        { allowString: false, allowNumber: false, allowNullableObject: false },
      ],
      '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: false }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 },
      ],

      /***********************
       * Import & module rules
       ***********************/
      'import/no-unresolved': 'off', // handled by TS
      'import/order': 'off', // replaced by simple-import-sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'import/newline-after-import': 'error',

      /***********************
       * React & JSX rules
       ***********************/
      'react/jsx-uses-react': 'off', // React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // we use TypeScript
      'react/no-unknown-property': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/jsx-sort-props': ['warn', { callbacksLast: true, shorthandFirst: true }],
      'react/no-unused-prop-types': 'off', // TS covers this
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /***********************
       * Accessibility & a11y
       ***********************/
      'jsx-a11y/anchor-is-valid': 'off', // Next.js handles links via next/link
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],

      /***********************
       * Possible Errors & Best Practices
       ***********************/
      eqeqeq: ['error', 'smart'],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-param-reassign': ['error', { props: false }],
      'consistent-return': 'error',
      'no-duplicate-imports': 'error',
      'no-restricted-syntax': [
        'warn',
        {
          selector: "CallExpression[callee.name='setTimeout']",
          message: 'Prefer using cancellable timers or abstractions for serverless environments.',
        },
      ],

      /***********************
       * Stylistic & Prettier
       ***********************/
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          semi: true,
          arrowParens: 'always',
        },
      ],

      /***********************
       * Node & Security
       ***********************/
      // avoid using deprecated Node APIs where possible
      'node/no-unsupported-features/es-syntax': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
      'import/resolver': {
        // TypeScript resolver helps eslint-plugin-import understand tsconfig paths
        typescript: {
          project: [
            './tsconfig.json',
            './apps/frontend/tsconfig.json',
            './apps/backend/tsconfig.json',
            './packages/*/tsconfig.json',
          ],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs'],
        },
      },
    },
  },

  // ========== Frontend (Next.js + React) specific rules ==========
  {
    files: ['apps/frontend/**/*.{ts,tsx,js,jsx}', 'packages/*/frontend/**/*.{ts,tsx,js,jsx}'],
    // Extend Next.js recommended rules + react recommended
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./apps/frontend/tsconfig.json', './tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    // plugin/extends usage is "rule-based" in flat config; we simulate extends by enabling key rules below
    rules: {
      // Next.js specific: prefer next/image, next/link usage - here we keep lenient but warn
      'jsx-a11y/anchor-has-content': 'warn',

      // React rules tuned for frontend
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'react/display-name': 'off', // optional in TSX
      // Example: disallow default export components (optional)
      // 'import/no-default-export': ['error', { allow: ['pages/_app.tsx'] }],
    },
  },

  // ========== React Native (mobile) specific tips - lint mobile files if present ==========
  {
    files: [
      '**/*.{native.ts,native.tsx,react-native.ts,react-native.tsx,android.tsx,ios.tsx,**/*mobile*.{ts,tsx}}',
    ],
    env: { 'react-native/react-native': true },
    plugins: { 'react-native': require('eslint-plugin-react-native') },
    rules: {
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
    },
  },

  // ========== Backend (NestJS / Node) specific rules ==========
  {
    files: ['apps/backend/**/*.{ts,js}', 'packages/*/backend/**/*.{ts,js}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./apps/backend/tsconfig.json', './tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    env: { node: true },
    rules: {
      // Some Nest-specific / server-side preferences
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      // Allow console in backend for logs but encourage logger usage
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
      // Prefer async/await over raw promise chains
      '@typescript-eslint/promise-function-async': ['warn', { allowAnywhere: false }],
    },
  },

  // ========== Test files (jest / testing-library / vitest) ==========
  {
    files: ['**/*.test.{ts,tsx,js}', '**/*.spec.{ts,tsx,js}', '**/__tests__/**/*.{ts,tsx,js}'],
    env: { jest: true },
    plugins: {
      jest: require('eslint-plugin-jest'),
      'testing-library': require('eslint-plugin-testing-library'),
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/expect-expect': 'warn',
      'testing-library/no-debug': 'warn',
    },
  },

  // ========== Configuration & scripts (allow CommonJS for config files) ==========
  {
    files: [
      '.eslintrc.js',
      'eslint.config.js',
      'packages/**/scripts/**',
      'scripts/**',
      'turbo.json',
      'next.config.js',
      'next.config.mjs',
      'apps/backend/src/main.ts',
    ],
    languageOptions: {
      sourceType: 'script', // allow require/module.exports in config files
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // ========== Optional: rules for JSON/MD files via eslint-plugin-jsonc (if installed) ==========
  // Add another block if you have eslint-plugin-jsonc or want MD linting.
];
