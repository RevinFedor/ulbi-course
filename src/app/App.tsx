import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Navbar } from 'src/widgets/Navbar';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';



function App() {
    const { theme } = useTheme();

    // отобразить линки вне роутинга
    return (
        <div className={classNames('app', {}, theme ? [theme] : [])}>
            <Suspense>
          
                <AppRouter>
                    <Navbar />
                </AppRouter>
            </Suspense>
        </div>
    );
}

export default App;
