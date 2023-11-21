import { Suspense, memo, useCallback } from 'react';
import {
    Route,
    Routes,
} from 'react-router-dom';
import {
    AppRoutesProps,
    routeConfig,
} from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

//! сделать компонент, который сначала показывает NavBar, а потом children

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const routeElement = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
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
