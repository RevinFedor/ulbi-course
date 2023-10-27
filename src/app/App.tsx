import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Navbar } from 'src/widgets/Navbar';

function App() {
    const { theme } = useTheme();

    // отобразить линки вне роутинга 
    return (
        <div className={classNames('app', {}, theme ? [theme] : [])}>
            <AppRouter>
                <Navbar />
            </AppRouter>
        </div>
    );
}

export default App;
