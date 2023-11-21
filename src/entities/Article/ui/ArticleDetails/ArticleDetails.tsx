import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { useCallback, useEffect } from 'react';
import { fetchArticleById } from '../../model/services/fetchArticleById';

import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { Loader } from '@/shared/ui/Loader/Loader';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../..';
import { Button } from '@/shared/ui/Button/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg?react';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg?react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Icon } from '@/shared/ui/Icon/Icon';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch]);

    //! получение данные от asyncfunk
    const article = useAppSelector(getArticleDetailsData);
    const isLoading = useAppSelector(getArticleDetailsIsLoading);
    const error = useAppSelector(getArticleDetailsError);

    //! статья с блоками текста, кода и картинка
    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        key={block.id}
                        className={cls.block}
                        block={block}
                    />
                );
            default:
                return null;
        }
    }, []);

    //! вернуться на предыдущую страницу
    const navigateError = () => {
        navigate(-1);
    };

    //! обработка загрузки и ошибок
    let content;
    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <>
                <Text theme={TextTheme.ERROR} title={'Статья не найдена'} />
                <Button onClick={navigateError}>Вернуться назад</Button>
            </>
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Icon={EyeIcon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Icon={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            {content}
        </div>
    );
};
