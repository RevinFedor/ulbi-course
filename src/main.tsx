import ReactDOM from 'react-dom/client';
import App from '@/app/App.tsx';
import './app/styles/index.scss';

import ThemeProvider from '@/app/providers/ThemeProvider/ui/ThemeProvider.tsx';

import '@/shared/config/i18n/i18n';
import ErrorBoundary from './app/providers/ErrorBoundory/ui/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>
);
