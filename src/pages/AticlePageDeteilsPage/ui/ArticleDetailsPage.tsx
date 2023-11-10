import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface ArticlePageDatailsProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticlePageDatailsProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticlePageDatails, {}, [className])}>
            ArticlePageDatails
        </div>
    );
};
export default memo(ArticleDetailsPage);
