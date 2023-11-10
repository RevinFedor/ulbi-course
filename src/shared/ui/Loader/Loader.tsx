import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';
import { useTranslation } from 'react-i18next';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames('lds-ripple', {}, [className])}>
            <div></div>
            <div></div>
        </div>
    );
};
