import { FC, ReactNode, Suspense, memo, useCallback, useMemo } from 'react';
import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from 'react-router-dom';
import {
    AppRoutesProps,
    routeConfig,
} from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader/PageLoader';
import { SideBar } from '@/widgets/SideBar';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { getUserAuthData } from '@/entities/User';
import { RequireAuth } from './RequireAuth';

// сделать компонент, который сначала показывает NavBar, а потом children

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const routeElement = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{route.element}</div>
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{routeElement}</RequireAuth>
                    ) : (
                        routeElement
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
