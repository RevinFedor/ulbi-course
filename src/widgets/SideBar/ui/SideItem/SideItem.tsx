import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { getUserAuthData } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { SideBarItemType } from '../../model/types/sidebar';

interface SideItemProps {
  item: SideBarItemType;
  collapsed?: boolean;
}

export const SideItem = ({ item, collapsed }: SideItemProps) => {
  const { t } = useTranslation();

  const isAuth = useAppSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

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
