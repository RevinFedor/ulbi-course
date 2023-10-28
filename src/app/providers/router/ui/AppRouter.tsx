import React, { FC, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from 'src/shared/config/routeConfig/routeConfig';
import { SideBar } from 'src/widgets/SideBar';

// сделать компонент, который сначала показывает NavBar, а потом children


type AppRouterProps = {
    children: ReactNode;
};

const AppRouter: FC<AppRouterProps> = ({ children }) => {
    const router = createBrowserRouter(
        Object.values(routeConfig).map(({ element, path }) => ({
            path,
            element: (
                <>
                    {children}

                    {/* <HeaderProvider>{element}</HeaderProvider> */}

                    <div className="content-page">
                        <SideBar />
                        <Suspense fallback={<div>Loading...</div>}>
                            {element}
                        </Suspense>
                    </div>
                </>
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
