import { RouteProps } from 'react-router-dom';
import App from 'src/app/App';
import { AboutPage } from 'src/pages/AboutPage';
import { MainPage } from 'src/pages/MainPage';


export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {

    [AppRoutes.MAIN]: '',
    [AppRoutes.ABOUT]: 'about',
};


// в качестве ключа у нас название роута, а в качестве значения путь и компонент
export const routeConfig: Record<AppRoutes, RouteProps> = {

    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
};
