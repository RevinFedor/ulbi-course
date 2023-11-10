import React from 'react';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AboutIcon from '@/widgets/assets/icons/about-20-20.svg?react';
import MainIcon from '@/widgets/assets/icons/main-20-20.svg?react';
import ProfileIcon from '@/widgets/assets/icons/profile-20-20.svg?react';

export interface SideBarItemType {
    path: string;
    text: string;
    Icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
    authOnly?: boolean;
}

export const SidebarItemsList: SideBarItemType[] = [
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
    {
        path: RoutePath.profile,
        text: 'ProfilePage',
        Icon: ProfileIcon,
        authOnly:true
    },
    {
        path: RoutePath.articles,
        text: 'ArticlePage',
        Icon: ProfileIcon,
        authOnly:true
    },
];
