import { createContext, useContext, useEffect, useReducer } from "react";
import { initialAuthState, authReducerFunction } from "reducers/";

const AuthContext = createContext(initialAuthState);
const { Provider } = AuthContext;


const AuthProvider = ({ children }) => {

    const getInitialAuthState = () => {
		const authToken = localStorage.getItem("inscribe-token");
		const authUser = JSON.parse(localStorage.getItem("inscribe-user"));

        if (authToken) {
            return {
                authUser,
                authToken,
                authError: false,
                authLoading: false,
                isAuth: true
            }
		}
        return initialAuthState;
    }

    const [authState, authDispatch] = useReducer(
		authReducerFunction,
		getInitialAuthState()
	);

	return <Provider value={{ ...authState, authDispatch }}>{children}</Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
