// Импортируем необходимые классы из библиотек
import { Project } from 'ts-morph';
import path from 'path';

// Создаем новый проект TypeScript
const project = new Project({});

// Добавляем в проект все файлы с расширением .ts и .tsx из директории 'src'
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все исходные файлы проекта
const files = project.getSourceFiles();

// Определяем путь до директории 'src/shared/ui'
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

// Получаем объект, представляющий директорию 'src/shared/ui' в проекте
const sharedUiDirectory = project.getDirectory(uiPath);

// Получаем все директории внутри 'src/shared/ui'
const componentsDirs = sharedUiDirectory?.getDirectories();

// Функция для проверки, является ли путь абсолютным
function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => value.startsWith(layer));
}

// Создаем index.ts файлы в каждой директории внутри 'src/shared/ui'
componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);

  // Если файла index.ts нет, создаем его и записываем экспорты
  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });

    file.save();
  }
});

// Итерируем по всем исходным файлам
files.forEach((sourceFile) => {
  // Получаем все инструкции импорта в каждом файле
  const importDeclarations = sourceFile.getImportDeclarations();

  // Итерируем по всем инструкциям импорта
  importDeclarations.forEach((importDeclaration) => {
    // Получаем значение модульного импорта (путь)
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    // Разбиваем путь на сегменты
    const segments = valueWithoutAlias.split('/');

    // Проверяем, начинается ли путь с 'shared' и следующий сегмент 'ui'
    const isSharedLayer = segments?.[0] === 'shared';
    const isUiSlice = segments?.[1] === 'ui';

    // Если путь абсолютен и начинается с 'shared/ui', то изменяем импорт
    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

// Сохраняем изменения в проекте
project.save();
