module.exports = {
  extends: [
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-strict',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // Add custom rules for .astro files here
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        // Add custom TypeScript rules here
      },
    },
  ],
  rules: {
    // Global rules
  },
};
