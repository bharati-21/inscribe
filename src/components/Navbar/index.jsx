import { Menu } from "@mui/icons-material";
import { Sidebar } from "components/";
import { useAuth, useNotes } from "contexts";

import "./navbar.css";

const Navbar = () => {
    const { showSidebar, handleShowSidebar } = useNotes();
    const { isAuth } = useAuth();

	return (
		<nav className="navbar flex-row flex-align-center flex-justify-between">
            <div className="left-nav flex-row flex-justify-center flex-align-center">
                {
                    isAuth && 
                    <div className="mobile-sidebar-wrapper">
                        <button className="btn btn-icon btn-hamburger" onClick={handleShowSidebar}>
                            {<Menu fontSize="large" />}
                        </button>
                        {showSidebar && (
                            <div className="mobile-sidebar flex-col flex-align-start flex-justify-center">
                                {
                                    <Sidebar
                                        showSidebar={showSidebar}
                                        handleShowSidebar={handleShowSidebar}
                                    />
                                }
                            </div>
                        )}
                    </div>
                }
                <h3 className="logo">inscribe</h3>
            </div>
			
		</nav>
	);
};

export { Navbar };
