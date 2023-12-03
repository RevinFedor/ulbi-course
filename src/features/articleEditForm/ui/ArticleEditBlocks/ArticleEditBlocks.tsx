import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  ArticleBlock,
  ArticleBlockType,
  ArticleCodeBlock,
  ArticleTextBlock,
  ArticleImageBlock,
  Article,
} from '@/entities/Article';
import { useArticleEditActions } from '../../model/slice/articleEditSlice';
import { ArticleCodeBlockEdit } from '../EditBlocks/ArticleCodeBlockEdit';
import { ArticleTextBlockEdit } from '../EditBlocks/ArticleTextBlockEdit';
import { ArticleImageBlockEdit } from '../EditBlocks/ArticleImageBlockEdit';
import cls from './ArticleEditBlocks.module.scss';

interface ArticleEditBlocksProps {
  className?: string;
  articleForm: Article;
}

export const ArticleEditBlocks = (props: ArticleEditBlocksProps) => {
  const { className, articleForm } = props;

  const { updateArticleBlock, removeArticleBlock } = useArticleEditActions();

  const onChangeCodeBlock = useCallback(
    (block?: ArticleCodeBlock) => {
      updateArticleBlock(block);
    },
    [updateArticleBlock],
  );

  const onChangeTextBlock = useCallback(
    (block?: ArticleTextBlock) => {
      updateArticleBlock(block);
    },
    [updateArticleBlock],
  );

  const onChangeImageBlock = useCallback(
    (block?: ArticleImageBlock) => {
      updateArticleBlock(block);
    },
    [updateArticleBlock],
  );

  const onDeleteBlock = useCallback(
    (id?: string) => {
      removeArticleBlock(id);
    },
    [removeArticleBlock],
  );

  //! статья с блоками текста, кода и картинка
  const renderBlock = useCallback(
    (block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockEdit
              key={block.id}
              block={block}
              className={cls.block}
              onChangeBlock={onChangeCodeBlock}
              onDeleteBlock={onDeleteBlock}
            />
          );
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockEdit
              key={block.id}
              block={block}
              className={cls.block}
              onChangeBlock={onChangeImageBlock}
              onDeleteBlock={onDeleteBlock}
            />
          );
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockEdit
              key={block.id}
              className={cls.block}
              block={block}
              onChangeBlock={onChangeTextBlock}
              onDeleteBlock={onDeleteBlock}
            />
          );
        default:
          return null;
      }
    },
    [onChangeCodeBlock, onChangeTextBlock, onChangeImageBlock, onDeleteBlock],
  );
  return (
    <div className={classNames('', {}, [className])}>{articleForm.blocks.map(renderBlock)}</div>
  );
};
