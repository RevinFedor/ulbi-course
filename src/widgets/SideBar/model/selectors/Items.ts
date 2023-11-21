import React from 'react';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg?react';
import MainIcon from '@/shared/assets/icons/main-20-20.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg?react';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg?react';
import { SideBarItemType } from '../types/sidebar';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

//?  !callback userdata принимает результат вызова getUserAuthData (данные о пользователе), и на основании их отрисовывает роутинг
//?  !функция меморизирует (кэширует) значение User и буду выхываться только в случае изменения state в user

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SideBarItemType[] = [
        {
            path: RoutePath.main,
            text: 'Main',
            Icon: MainIcon,
        },
        {
            path: RoutePath.about,
            text: 'About',
            Icon: AboutIcon,
        },
    ];
    if (userData) {
        sidebarItemsList.push(
            {
                path: `${RoutePath.profile}${userData?.id}`,
                text: 'ProfilePage',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                text: 'ArticlePage',
                Icon: ArticleIcon,
                authOnly: true,
            }
        );
    }
    return sidebarItemsList
});
