module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  // так нада
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // тут был react-refresh
  plugins: [
    'react',
    'i18next',
    '@typescript-eslint',
    'react-hooks',
    'ulbi-tv-plugin',
    'unused-imports',
  ],

  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/button-has-type': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'i18next/no-literal-string': 1,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies

    'no-invalid-position-at-import-rule': 'off',
    // В рамках одного слайса все пути должны быть относительными
    'ulbi-tv-plugin/path-checker': ['error', { alias: '@' }],
    // Абсолютный импорт разрешен только из Public API
    'ulbi-tv-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
      },
    ],
    // Слой может импортировать в себя только нижележащие слои
    'ulbi-tv-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],

    // Удаление неиспользуемых импортов
    'unused-imports/no-unused-imports': 'warn',
    // Настройка порядка импортов
    // 'import/no-unresolved': '[2, {commonjs: true, amd: true}]',
    // 'import/named': '2',
    // 'import/namespace': '2',
    // 'import/default': '2',
    // 'import/export': '2',
    // defolt import form Ulbi TV
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'react/no-array-index-key': 'off',
    'no-restricted-globals': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'padded-blocks': 'off',
    'import/order': 'warn',
    'linebreak-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'max-len': 'off',
    'function-paren-newline': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
};
