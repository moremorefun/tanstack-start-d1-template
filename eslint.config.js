import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 19 doesn't need this
      'react/prop-types': 'off', // Using TypeScript types
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '*.gen.ts',
      '**/*.d.ts',
      'coverage/',
      '.wrangler/',
      '.vinxi/',
      '.output/',
      '.nitro/',
      '.tanstack/',
      '.vscode/',
      'drizzle/',
      'playwright-report/',
      'test-results/',
    ],
  },
  prettier // Must be last to disable conflicting Prettier rules
)
