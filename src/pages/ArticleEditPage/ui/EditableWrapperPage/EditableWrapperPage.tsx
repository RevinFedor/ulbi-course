import { useNavigate } from 'react-router-dom';
import { useGetArticleByIdQuery } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { ArticleEditForm } from '../../../../features/articleEditForm';

interface EditableWrapperPageProps {
  className?: string;
  id: string;
}

export const EditableWrapperPage = (props: EditableWrapperPageProps) => {
  const { className, id } = props;
  //! редактирование существующий
  const navigate = useNavigate();

  const { data: article, isLoading, error, isSuccess } = useGetArticleByIdQuery(id);

  const navigateError = () => {
    navigate(-1);
  };
  if (isLoading || !isSuccess) {
    return (
      <>
        <Skeleton className="m-auto object-cover" width={200} height={200} border="50%" />
        <Skeleton className="mt-5" width={300} height={32} />
        <Skeleton className="mt-4" width={600} height={24} />
        <Skeleton className="mt-4" width="100%" height={200} />
        <Skeleton className="mt-4" width="100%" height={200} />
      </>
    );
  }
  if (error) {
    return (
      <>
        <Text theme={TextTheme.ERROR} title="Статья не найдена" />
        <Button onClick={navigateError}>Вернуться назад</Button>
      </>
    );
  }

  return (
    <div className={classNames('', {}, [className])}>
      <ArticleEditForm editInitArticle={article} id={id} />
    </div>
  );
};
