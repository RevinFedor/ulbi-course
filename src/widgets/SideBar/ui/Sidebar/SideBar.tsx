import { useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button';
import { SideItem } from '../SideItem/SideItem';
import { getSidebarItems } from '../../model/selectors/Items';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { ThemSwitcher } from '@/features/ThemSwitcher';


interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const onToogle = () => setCollapsed((collapsed) => !collapsed);

  const sidebarItemsList = useAppSelector(getSidebarItems);
  //! предотвращение перерисовки дочерних компонентов, при перерисовке родителей
  const itemList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SideItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <menu
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className || '',
      ])}
    >
      <Button
        theme={ThemeButton.BACKGROUND_INVERTED}
        className={cls.collapseBtn}
        onClick={onToogle}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>{itemList}</div>

      <div className={cls.switchers}>
        <ThemSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </menu>
  );
};
