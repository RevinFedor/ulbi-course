import ReactDOM from 'react-dom/client';
import App from 'src/app/App.tsx';
import './app/styles/index.scss';
import ThemeProvider from 'src/app/providers/ThemeProvider/ui/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
