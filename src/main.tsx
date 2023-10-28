import ReactDOM from 'react-dom/client';
import App from 'src/app/App.tsx';
import './app/styles/index.scss';
import ThemeProvider from 'src/app/providers/ThemeProvider/ui/ThemeProvider.tsx';
import  {I18nextProvider}  from 'react-i18next';

import 'src/shared/config/i18n/i18n'
import ErrorBoundary from './app/providers/ErrorBoundory/ui/ErrorBoundary';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>

        <ThemeProvider>
            <App />
        </ThemeProvider>
    </ErrorBoundary>
);
