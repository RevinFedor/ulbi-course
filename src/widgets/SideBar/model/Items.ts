import React from 'react';
import { RoutePath } from 'src/shared/config/routeConfig/routeConfig';
import AboutIcon from 'src/widgets/assets/icons/about-20-20.svg?react';
import MainIcon from 'src/widgets/assets/icons/main-20-20.svg?react';
import ProfileIcon from 'src/widgets/assets/icons/profile-20-20.svg?react';

export interface SideBarItemType {
    path: string;
    text: string;
    Icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
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
    },
];
