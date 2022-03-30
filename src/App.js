import { Navbar } from 'components/';
import { useAuth } from 'contexts/';
import { NavRoutes } from 'WebappRoutes/NavRoutes';

const App = () => {
    const { authState: { isAuth } } = useAuth();

    return (
        <div className="App flex-col">
            <Navbar />
            <NavRoutes />
        </div>
    );
}

export default App;
