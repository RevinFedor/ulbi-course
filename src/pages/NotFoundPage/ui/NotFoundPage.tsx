import { classNames } from 'src/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import { Text } from 'src/shared/ui/Text/Text';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className || ''])}>
            Страница не найдена
        </div>
    );
};
