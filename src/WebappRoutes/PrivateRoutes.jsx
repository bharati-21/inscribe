import { useAuth } from "contexts";
import { Login } from "pages";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "components/";

const PrivateRoutes = () => {
	const {
		authState: { isAuth },
	} = useAuth();

	return isAuth ? (
		<main className="grid-container">
			<Sidebar className="sidebar" />
			<Outlet />
		</main>
	) : (
		<Navigate to="/login" />
	);
};

export { PrivateRoutes };
