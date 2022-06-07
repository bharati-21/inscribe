import { Menu } from "@mui/icons-material";
import { Sidebar } from "components/";
import { useAuth, useNotes } from "contexts";
import { useOutsideClick } from "custom-hook";
import { useRef } from "react";

import "./navbar.css";

const Navbar = () => {
	const { showSidebar, handleShowSidebar, setShowSidebar } = useNotes();
	const { isAuth } = useAuth();

	const mobileSidebarReference = useRef(null);

	useOutsideClick(mobileSidebarReference, () => setShowSidebar());

	const handleMenuClicked = (e) => {
		e.stopPropagation();
		handleShowSidebar();
	};

	return (
		<nav className="navbar flex-row flex-align-center flex-justify-between">
			<div className="left-nav flex-row flex-justify-center flex-align-center">
				{isAuth && (
					<div className="mobile-sidebar-wrapper">
						<button
							className="btn btn-icon btn-hamburger"
							onClick={handleMenuClicked}
						>
							{<Menu fontSize="large" />}
						</button>
						{showSidebar && (
							<div
								className="mobile-sidebar flex-col flex-align-start flex-justify-center"
								ref={mobileSidebarReference}
							>
								{
									<Sidebar
										showSidebar={showSidebar}
										handleShowSidebar={handleShowSidebar}
									/>
								}
							</div>
						)}
					</div>
				)}
				<h3 className="logo">inscribe</h3>
			</div>
		</nav>
	);
};

export { Navbar };
