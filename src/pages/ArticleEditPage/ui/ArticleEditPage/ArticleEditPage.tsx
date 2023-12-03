import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { ArticleEditForm } from '@/features/articleEditForm';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { getUserAuthData } from '@/entities/User';
import { Article, ArticleType } from '@/entities/Article';
import { EditableWrapperPage } from '../EditableWrapperPage/EditableWrapperPage';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;

  //! редактировать или создать - в зависимости от url
  const { id } = useParams<{ id: string }>();

  //! созздать статью
  const user = useAppSelector(getUserAuthData);

  const newArticle: Article = {
    id: uuidv4(),
    title: '',
    subtitle: '',
    img: '',
    views: 0,
    createdAt: '',
    type: [ArticleType.ALL],
    blocks: [],
    userId: user?.id || '',
  };

  if (!user) {
    return (
      <Page className={classNames(cls.ArticleEditPage, {}, [className])}>Вы не авторизованы</Page>
    );
  }

  //! надо внутри сделать разбивку. поменять тот же самый запрос rtk. слишкмо много улсовий
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {id ? <EditableWrapperPage id={id} /> : <ArticleEditForm editInitArticle={newArticle} id="" />}
    </Page>
  );
});

export default ArticleEditPage;
