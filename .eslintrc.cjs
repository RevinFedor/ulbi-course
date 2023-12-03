module.exports = {
  root: true, // Указывает ESLint остановить поиск конфигурации вверх по дереву файлов
  env: {
    browser: true, // Определяет переменные окружения для браузера
    es2021: true, // Определяет переменные окружения для ECMAScript 2021
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    // 'eslint:recommended', // Базовые правила ESLint
    // 'plugin:@typescript-eslint/recommended', // Рекомендации по использованию TypeScript
    'airbnb', // Airbnb стандартные правила
    // 'plugin:react-hooks/recommended', // Рекомендации по использованию хуков в React
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Игнорирует указанные директории и файлы при проверке
  parser: '@typescript-eslint/parser', // Указывает парсер для TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Позволяет разбирать JSX
    },
    ecmaVersion: 'latest', // Версия ECMAScript, которую следует использовать
    sourceType: 'module', // Устанавливает тип модуля для разбора
  },
  plugins: [
    'react', // Поддержка React
    'i18next', // Плагин для i18next
    '@typescript-eslint', // Поддержка TypeScript
    'react-hooks', // Поддержка правил хуков в React
    'ulbi-tv-plugin', // Пользовательский плагин
    'unused-imports', // Проверка на неиспользуемые импорты
  ],
  rules: {
    indent: 'off', // Отключает правило отступов, так как используется airbnb
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ], // Разрешает расширения JSX в .js, .jsx и .tsx файлах
    // '@typescript-eslint/no-unused-vars': 'off', // Отключает правило проверки неиспользуемых переменных TypeScript, так как airbnb также содержит подобное
    // '@typescript-eslint/ban-ts-comment': 'off', // Отключает правило запрета комментариев TypeScript, так как оно выключено
    // '@typescript-eslint/no-explicit-any': 'warn', // Выводит предупреждение при использовании явного типа any
    'jsx-a11y/alt-text': 'warn', // Выводит предупреждение при отсутствии атрибута alt для изображений
    'react/button-has-type': 'off', // Отключает проверку типа кнопок в React
    'operator-linebreak': 'off', // Отключает правило переноса операторов на новую строку
    'no-param-reassign': 'off', // Отключает изменение параметра функции

    // '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключает требование указания типов возвращаемых значений для функций TypeScript
    // 'i18next/no-literal-string': 1, // Закомментировано, возможно, это правило относится к плагину i18next
    // 'react-hooks/rules-of-hooks': 'error', // Включает проверку правил использования хуков в React
    // 'react-hooks/exhaustive-deps': 'error', // Включает проверку зависимостей эффектов хуков в React

    'no-invalid-position-at-import-rule': 'off', // Отключает проверку расположения правила импорта в CSS (возможно, связано с PostCSS)

    'ulbi-tv-plugin/path-checker': ['error', { alias: '@' }], // Включает проверку относительных путей для alias в слайсах
    'ulbi-tv-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.story.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ], // Включает проверку абсолютных импортов только из файлов Public API

    'ulbi-tv-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ], // Включает проверку импортов, разрешенных только из нижележащих слоев

    'react/jsx-max-props-per-line': ['error', { maximum: 4 }], // props перенос
    'unused-imports/no-unused-imports': 'warn', // Включает предупреждение о неиспользуемых импортах
    'import/no-unresolved': 'off', // Отключает проверку неразрешенных импортов
    'import/prefer-default-export': 'off', // Отключает предпочтение использования экспорта по умолчанию
    'no-unused-vars': 'off', // Отключает предупреждение о неиспользуемых переменных
    'react/require-default-props': 'off', // Отключает требование использования дефолтных значений для пропсов в React
    'react/react-in-jsx-scope': 'off', // Отключает предупреждение о том, что React должен быть в области видимости при использовании JSX
    'react/jsx-props-no-spreading': 'warn', // Включает предупреждение при использовании spread оператора для пропсов в JSX
    'react/function-component-definition': 'off', // Отключает требование явного указания типа для функциональных компонентов в React
    'no-shadow': 'off', // Отключает предупреждение о переопределении переменных внутри блока
    'import/extensions': 'off', // Отключает проверку расширений файлов при импорте
    'import/no-extraneous-dependencies': 'off', // Отключает проверку лишних зависимостей
    'object-curly-newline': 'off', // Отключает требование переноса строк внутри фигурных скобок
    'comma-dangle': 'off', // Отключает проверку наличия запятой в конце объектов и массивов
    'react/no-array-index-key': 'off', // Отключает предупреждение о использовании индексов массивов в качестве ключей в React
    'no-restricted-globals': 'off', // Отключает предупреждение о запрещенных глобальных переменных
    'no-trailing-spaces': 'off', // Отключает предупреждение о наличии пробелов в конце строк
    'no-multiple-empty-lines': 'off', // Отключает предупреждение о наличии нескольких пустых строк
    'padded-blocks': 'off', // Отключает предупреждение о наличии пустых блоков
    'import/order': 'warn', // Включает предупреждение о нарушении порядка импортов
    'linebreak-style': 'off', // Отключает предупреждение о стиле переноса строк (LF/CRLF)
    'implicit-arrow-linebreak': 'off', // Отключает предупреждение о неявном переносе строки в стрелочных функциях
    'function-paren-newline': 'off', // Отключает предупреждение о переносе строки после открывающей скобки функции
    'no-undef': 'off', // Отключает предупреждение о использовании неопределенных переменных
    'no-underscore-dangle': 'off', // Отключает предупреждение о использовании подчеркивания в именах переменных
    'jsx-a11y/click-events-have-key-events': 'off', // Отключает предупреждение о том, что кликабельные элементы должны иметь соответствующие обработчики клавиш
    'jsx-a11y/no-static-element-interactions': 'off', // Отключает предупреждение о статических элементах, взаимодействующих с пользователем
    'react/no-unused-prop-types': 'off', // Отключает предупреждение о неиспользуемых prop types в React-компонентах
    'react/jsx-no-useless-fragment': 'off', // Отключает предупреждение о бесполезном использовании фрагментов в JSX
    'jsx-a11y/img-redundant-alt': 'off', // Отключает предупреждение о лишнем атрибуте alt у изображений
    'max-len': [
      'warn',
      {
        ignoreComments: true,
        code: 125,
      },
    ], // предупреждение о превышении максимальной длины строки
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
