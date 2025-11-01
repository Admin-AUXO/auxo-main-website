import astroEslintParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      astro: astroPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,
      // Custom Astro rules
    },
  },
  // TypeScript and JavaScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript/JavaScript rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // Ignore patterns
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'public/'],
  },
];
