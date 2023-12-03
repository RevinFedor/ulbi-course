import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleImageBlock } from '@/entities/Article';
import { Input } from '@/shared/ui/Input';
import cls from './ArticleBlockEdit.module.scss';

interface ArticleImageBlockEditProps {
  className?: string;
  block: ArticleImageBlock;
  onChangeBlock?: (value: ArticleImageBlock) => void;
  onDeleteBlock: (value: string) => void;
}

export const ArticleImageBlockEdit = memo((props: ArticleImageBlockEditProps) => {
  const { className, block, onChangeBlock, onDeleteBlock } = props;

  const onChangeSrcHandler = (srcChange: string) => {
    onChangeBlock?.({ src: srcChange, type: block.type, id: block.id, title: block.title });
  };
  const onChangeTitleHandler = (titleChange: string) => {
    onChangeBlock?.({ src: block.src, type: block.type, id: block.id, title: titleChange });
  };
  return (
    <div className={classNames('', {}, [className])}>
      <img src={block.src} alt={block.title} className="max-w-full" />
      <Input
        placeholder="Описание картинки"
        onChange={onChangeTitleHandler}
        className="text-[20px] bg-white mb-4 w-full"
        value={block.title}
        theme={['outline']}
      />
      <Input
        placeholder="Ссылка на картинку"
        onChange={onChangeSrcHandler}
        className="text-[16px] bg-white mb-4 w-full"
        value={block.src}
        theme={['outline']}
      />
      <button className={cls.delete_Block_Button} onClick={(e) => onDeleteBlock(block.id)}>
        Удалить блок
      </button>
    </div>
  );
});
