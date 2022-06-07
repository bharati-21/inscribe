import { useAuth } from "contexts";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "components/";

const PrivateRoutes = () => {
	const { isAuth } = useAuth();
	const location = useLocation();

	return isAuth ? (
		<main className="grid-container">
			<Sidebar className="sidebar" />
			<Outlet />
		</main>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export { PrivateRoutes };
