import React, { FC, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from 'src/shared/config/routeConfig/routeConfig';

// сделать компонент, который сначала показывает NavBar, а потом children

// здесь у нас над компонетом всегда отображается Navbar

// props для компонента
type AppRouterProps = {
    children: ReactNode;
};

const AppRouter: FC<AppRouterProps> = ({ children }) => {
    const router = createBrowserRouter(
        Object.values(routeConfig).map(({ element, path }) => ({
            path,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                    {/* <HeaderProvider>{element}</HeaderProvider> */}
                    {element}
                </Suspense>
            ),
        }))
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
