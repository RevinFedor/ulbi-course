import { useLayoutEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleCodeBlock } from '@/entities/Article';
import cls from './ArticleBlockEdit.module.scss';

interface ArticleCodeBlockEditProps {
  className?: string;
  block: ArticleCodeBlock;
  onChangeBlock?: (value: ArticleCodeBlock) => void;
  onDeleteBlock: (value: string) => void;
}

export const ArticleCodeBlockEdit = (props: ArticleCodeBlockEditProps) => {
  const { className, block, onChangeBlock, onDeleteBlock } = props;
  const [textareaHeight, setTextareaHeight] = useState('auto');

  useLayoutEffect(() => {
    // Получаем элемент textarea по id
    const textareaElement = document.getElementById('textarea');

    // Проверяем, что элемент существует
    if (textareaElement) {
      // Устанавливаем высоту textarea в зависимости от содержимого
      setTextareaHeight(`${textareaElement.scrollHeight}px`);
    }
  }, [block]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeBlock?.({ code: e.target.value, type: block.type, id: block.id });
  };

  return (
    <div className={classNames('w-full h-full', {}, [className])}>
      <textarea
        id="textarea"
        style={{ height: textareaHeight }}
        className="w-full resize-none"
        value={block.code}
        onChange={onChangeHandler}
      />
      <button className={cls.delete_Block_Button} onClick={(e) => onDeleteBlock(block.id)}>
        Удалить блок
      </button>
    </div>
  );
};
