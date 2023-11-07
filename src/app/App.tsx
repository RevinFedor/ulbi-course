import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Navbar } from 'src/widgets/Navbar';
import { Suspense, useState, useEffect } from 'react';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { useAppDispatch } from './types/hooksStore';
import { userActions } from 'src/entities/User';
import React from 'react';

function App() {
    const dispath = useAppDispatch();
    useEffect(() => {
        dispath(userActions.initAuthData());
    }, []);

    // отобразить линки вне роутинга
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense>
                <AppRouter>
                    <Navbar />
                </AppRouter>
            </Suspense>
        </div>
    );
}

export default App;
