import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'],
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Jeśli potrzebujesz project: './tsconfig.json', to odkomentuj i upewnij się że plik istnieje
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/prop-types': 'off',
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
];
