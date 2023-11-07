import { classNames } from 'src/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { SideBarItemType } from '../../model/Items';
import cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from 'src/shared/ui/AppLink/AppLink';

interface SideItemProps {
    item: SideBarItemType;
    collapsed?: boolean;
}

export const SideItem = ({ item, collapsed }: SideItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
};
