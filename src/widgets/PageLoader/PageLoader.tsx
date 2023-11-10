import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui/Loader/Loader';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};
