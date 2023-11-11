import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { CommentList } from '@/entities/Comment';
import { Text } from '@/shared/ui/Text/Text';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';

interface ArticlePageDatailsProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticlePageDatailsProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useAppSelector(getArticleComments.selectAll);
    
    const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    },[]);

    if (!id)
        return (
            <div
                className={classNames(cls.ArticlePageDatails, {}, [className])}
            >
                Статья не найдена
            </div>
        );

    return (
        <div className={classNames(cls.ArticlePageDatails, {}, [className])}>
            <ArticleDetails id={id} />
            <Text className={cls.commentTitle} title={'Комментарии'} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </div>
    );
};
export default memo(ArticleDetailsPage);
