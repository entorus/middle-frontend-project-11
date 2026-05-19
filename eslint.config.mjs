import js from '@eslint/js'
import globals from 'globals'
import html from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**']
  },

  prettier,

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      '@stylistic': stylistic
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      '@stylistic/semi': ['error', 'never']
    }
  },

  {
    files: ['**/*.html'],
    plugins: {
      html
    },
    languageOptions: {
      parser: htmlParser
    },
    rules: {
      'html/require-lang': 'error',
      'html/require-title': 'error',
      'html/no-duplicate-id': 'error'
    }
  },
])