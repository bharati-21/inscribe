import { Navbar, NewNoteModal } from 'components/';
import { NavRoutes } from 'WebappRoutes/NavRoutes';

const App = () => {
    return (
        <div className="App flex-col">
            <Navbar />
            <NewNoteModal />
            <NavRoutes />
        </div>
    );
}

export default App;
