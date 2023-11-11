import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { useTranslation } from 'react-i18next';
import { FC, memo, useState } from 'react';

interface ArticlePageProps {
    className: string;
}

type ArticlePagePropsTist = Partial<ArticlePageProps> & {
    helloKitty?: undefined;
};

const ArticlePage: FC<ArticlePagePropsTist> = ({ className }) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            ArticlePage
        </div>
    );
};

export default memo(ArticlePage);
