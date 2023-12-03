import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { DropMenu } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  const isAdminPanelAvalibale = isAdmin || isManager;
  return (
    <DropMenu
      direction="bottom"
      //!  используется оператор spread (...), чтобы "распаковать" элементы массива внутри другого массива.
      //! Это превращает массив с одним объектом в список объектов.
      //! Если isAdminPanelAvailable ложно, то создается пустой массив ([]), и оператор spread не добавляет ничего, так как распаковывать нечего.
      items={[
        ...(isAdminPanelAvalibale
          ? [
              {
                content: t('Админка'),
                href: getRouteAdmin(),
              },
            ]
          : []),
        {
          content: t('Профиль'),
          href: getRouteProfile(authData.id),
        },
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData?.avatar} />}
    />
  );
};
