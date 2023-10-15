module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-len': 'OFF',
    'max-lines': ['warn', 400],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'after', '==': 'after', '===': 'after' } }],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'require-await': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'require-jsdoc': 'OFF',
  },
};
