import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Suspense, useState, useEffect } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks/hooksStore';
import { getUserInited, userActions } from '@/entities/User';
import React from 'react';
import { SideBar } from '@/widgets/SideBar';
import { useAsyncError } from 'react-router-dom';

function App() {
    const dispath = useAppDispatch();
    const inited = useAppSelector(getUserInited);
    useEffect(() => {
        dispath(userActions.initAuthData());
    }, []);

    // отобразить линки вне роутинга
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <SideBar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
