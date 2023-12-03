import { memo, useLayoutEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleTextBlock } from '@/entities/Article';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import cls from './ArticleBlockEdit.module.scss';

interface ArticleTextBlockEditProps {
  className?: string;
  block: ArticleTextBlock;
  onChangeBlock?: (value: ArticleTextBlock) => void;
  onDeleteBlock: (value: string) => void;
}

export const ArticleTextBlockEdit = memo((props: ArticleTextBlockEditProps) => {
  const { className, block, onChangeBlock, onDeleteBlock } = props;
  const [textareaHeight, setTextareaHeight] = useState('auto');

  useLayoutEffect(() => {
    const textareaElement = document.getElementById('textarea-text');

    if (textareaElement) {
      // Устанавливаем высоту textarea в зависимости от содержимого
      setTextareaHeight(`${textareaElement.scrollHeight}px`);
    }
  }, [block]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    // Создайте копию массива paragraphs
    const updatedParagraphs = [...block.paragraphs];
    // Обновите значение в массиве по указанному индексу
    updatedParagraphs[index] = e.target.value;
    // Выведите обновленный массив
    onChangeBlock?.({
      paragraphs: updatedParagraphs,
      type: block.type,
      title: block.title,
      id: block.id,
    });
  };

  const onTitleHandler = (title: string) => {
    onChangeBlock?.({ paragraphs: block.paragraphs, type: block.type, title, id: block.id });
  };
  const addParagraphHandler = () => {
    const updatedParagraphs = [...block.paragraphs];
    updatedParagraphs.push('');
    onChangeBlock?.({
      paragraphs: updatedParagraphs,
      type: block.type,
      title: block.title,
      id: block.id,
    });
  };
  const removeParagraphHandler = (index: number) => {
    const updatedParagraphs = [...block.paragraphs];
    // Проверьте, что индекс находится в пределах массива

    if (index >= 0 && index < updatedParagraphs.length) {
      updatedParagraphs.splice(index, 1);

      onChangeBlock?.({
        paragraphs: updatedParagraphs,
        type: block.type,
        title: block.title,
        id: block.id,
      });
    }
  };

  return (
    <div className={classNames('flex flex-col items-start', {}, [className])}>
      <Input
        onChange={onTitleHandler}
        className="text-2xl bg-white mb-4 w-full"
        value={block.title}
      />
      {/* масств делать не вариат */}
      {block.paragraphs.map((paragraph, index) => (
        <>
          <textarea
            key={index}
            value={paragraph}
            style={{ height: '200px' }}
            onChange={(e) => onChangeHandler(e, index)}
            className="mt-2 w-full resize-none"
          />
          <button
            className={cls.delete_paragraph_Button}
            onClick={(e) => removeParagraphHandler(index)}
          >
            Удалить параграф
          </button>
        </>
      ))}
      <button
        className="text-gl-primary border border-gl-primary px-2 py-1 mt-2 text-[14px] "
        onClick={addParagraphHandler}
      >
        Добваить параграф
      </button>
      <button className={cls.delete_Block_Button} onClick={(e) => onDeleteBlock(block.id)}>
        Удалить блок
      </button>
    </div>
  );
});
