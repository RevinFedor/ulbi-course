import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Article,
  ArticleBlock,
  ArticleBlockType,
  ArticleType,
  useGetArticleByIdQuery,
  useUpdateArticleByIdMutation,
} from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text, TextTheme } from '@/shared/ui/Text';
import cls from './ArticleEditForm.module.scss';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg?react';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg?react';
import { useArticleEditActions } from '../../model/slice/articleEditSlice';
import { useArticleEditForm } from '../../model/selectors/articleEditSelectors';
import { ArticleEditBlocks } from '../ArticleEditBlocks/ArticleEditBlocks';
import { Input } from '@/shared/ui/Input';
import { ArticleEditBlockHeader } from '../ArticleEditBlockHeader/ArticleEditBlockHeader';
import { ArticleTypeBlockSelect } from '../ArticleTypeSelect/ArticleTypeBlockSelect';
import { ArticleTypeSelect } from '../ArticleTypeSelect/ArticleTypeSelect';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { getUserAuthData } from '@/entities/User';

interface ArticleEditFormProps {
  className?: string;
  id: string;
  editInitArticle: Article;
}

export const ArticleEditForm = (props: ArticleEditFormProps) => {
  const { className, id, editInitArticle } = props;

  const articleForm = useArticleEditForm();
  const { initArticle, updateArticleFields, addArticleBlock } = useArticleEditActions();

  const [updateArticleQuery, { isLoading: isLoadingUpdate }] = useUpdateArticleByIdMutation({
    fixedCacheKey: 'update-articleById',
  });

  useEffect(() => {
    initArticle(editInitArticle);

    // eslint-disable-next-line
  }, [editInitArticle]);

  const onChangeAvatar = (srcChange: string) => {
    updateArticleFields({ img: srcChange });
  };
  const onChangeType = (typeChange: string) => {
    updateArticleFields({ type: typeChange });
  };

  const onChangeTitle = (titleChange: string) => {
    updateArticleFields({ title: titleChange });
  };
  const onChangeSubtitle = (subtitleChange: string) => {
    updateArticleFields({ subtitle: subtitleChange });
  };

  const addArticleBlockHandler = useCallback(
    (block?: string) => {
      let newBlock: ArticleBlock;

      switch (block) {
        case ArticleBlockType.CODE:
          newBlock = { id: uuidv4(), type: block, code: '' };
          break;
        case ArticleBlockType.IMAGE:
          newBlock = { id: uuidv4(), type: block, src: '', title: '' };
          break;
        case ArticleBlockType.TEXT:
          newBlock = { id: uuidv4(), type: block, paragraphs: [''], title: '' };
          break;
        default:
          throw new Error('Invalid block type');
      }

      addArticleBlock(newBlock);
    },
    [addArticleBlock],
  );

  //! обработка загрузки и ошибок
  let content;
  if (!articleForm || isLoadingUpdate) {
    content = (
      <>
        <Skeleton className="m-auto object-cover" width={200} height={200} border="50%" />
        <Skeleton className="mt-5" width={300} height={32} />
        <Skeleton className="mt-4" width={600} height={24} />
        <Skeleton className="mt-4" width="100%" height={200} />
        <Skeleton className="mt-4" width="100%" height={200} />
      </>
    );
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={articleForm?.img} className="m-auto object-cover" />
        </div>
        <Input
          placeholder="Ссылка на картинку"
          className="text-[24px] bg-white mb-4 w-full"
          onChange={onChangeAvatar}
          value={articleForm?.img}
          theme={['outline']}
        />
        <Input
          placeholder="Заголовок"
          className="text-[24px] bg-white mb-4 w-full"
          onChange={onChangeTitle}
          value={articleForm?.title}
          theme={['outline']}
        />
        <Input
          placeholder="Подзаголовок"
          className="text-[20px] bg-white mb-4 w-full"
          onChange={onChangeSubtitle}
          value={articleForm?.subtitle}
          theme={['outline']}
        />
        <ArticleTypeSelect
          className="mb-4"
          onChange={onChangeType}
          value={String(articleForm?.type)}
        />
        <div className={cls.articleForm}>
          <Icon className={cls.icon} Icon={EyeIcon} />
          <Text text={String(articleForm?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Icon={CalendarIcon} />
          <Text text={articleForm?.createdAt} />
        </div>
        <ArticleEditBlocks articleForm={articleForm} />
        <ArticleTypeBlockSelect onChange={addArticleBlockHandler} value="Добавить новый блок" />
      </>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      <ArticleEditBlockHeader id={id} />

      {content}
    </div>
  );
};
