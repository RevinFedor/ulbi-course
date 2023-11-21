import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { CommentList } from '@/entities/Comment';
import { Text } from '@/shared/ui/Text/Text';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';
import { AddCommentForm } from '@/features/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Page } from '@/widgets/Page/Page';

interface ArticlePageDatailsProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticlePageDatailsProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useAppSelector(getArticleComments.selectAll);
    const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    if (!id)
        return (
            <Page
                className={classNames(cls.ArticlePageDatails, {}, [className])}
            >
                Статья не найдена
            </Page>
        );

    return (
        <Page className={classNames(cls.ArticlePageDatails, {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            <ArticleDetails id={id} />
            <Text className={cls.commentTitle} title={'Комментарии'} />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </Page>
    );
};
export default memo(ArticleDetailsPage);
