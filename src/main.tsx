
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import ThemeProvider from './theme/ThemeProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
