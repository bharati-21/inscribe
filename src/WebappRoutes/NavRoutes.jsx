import { Trash, Home, Labels, Archive, Profile, Login, Signup } from "pages";
import Mockman from "mockman-js";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";

const NavRoutes = () => {
  
	return (
		<Routes>
			<Route element={<Mockman />} path="/mockman" />
			<Route element={<Login />} path="/login" />
			<Route element={<Signup />} path="/signup" />
			<Route element={<PrivateRoutes />} path="/">
				<Route element={<Home />} path="/home" />
				<Route element={<Home />} path="/" />
				<Route element={<Labels />} path="/labels" />
				<Route element={<Archive />} path="/Archive" />
				<Route element={<Trash />} path="/trash" />
				<Route element={<Profile />} path="/profile" />
			</Route>
		</Routes>
	);
};

export { NavRoutes };
