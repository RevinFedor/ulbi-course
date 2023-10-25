import { useContext, useState } from 'react';

import React, { Suspense } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';
import AboutPage from './Pages/AboutPage/AboutPage.tsx';
import { MainPageAsync } from './Pages/MainPage/MainPage.async.tsx';
import { AboutPageAsync } from './Pages/AboutPage/AboutPage.async.tsx';
import './styles/index.scss';
import { Theme, ThemeContext } from './theme/ThemeContext.ts';
import { useTheme } from './theme/useTheme.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className="dark">
                <h1>Hello World</h1>
                <Link to="about">About Us</Link>
            </div>
        ),
    },
    {
        path: '/about',
        element: (
            <Suspense>
                <AboutPageAsync />
            </Suspense>
        ),
    },
    {
        path: '/main',
        element: (
            <Suspense>
                <MainPageAsync />
            </Suspense>
        ),
    },
]);

function App() {
    const { theme, toggleTheme } = useTheme();

 

    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>
                {`Toogle ${theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}`}
            </button>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
