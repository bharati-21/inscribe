import { authActions as actionTypes } from "./actions";

const initialAuthState = {
	isAuth: false,
	authToken: "",
	authLoading: false,
	authError: null,
	authUser: {},
};

const authReducerFunction = (
	prevAuthState,
	{
		action: {
			type,
			payload: { isAuth, authLoading, authError, authUser, authToken },
		},
	}
) => {
	switch (type) {
		case actionTypes.INIT_AUTH:
			return {
				...prevAuthState,
				isAuth,
				authLoading,
				authError,
				authUser,
				authToken,
			};

		case actionTypes.RESET_AUTH:
			return initialAuthState;

		case actionTypes.SET_AUTH_LOADER_ERROR:
			return { ...prevAuthState, authLoading, authError };

		default:
			throw new Error("Invalid Dispatch action type!");
	}
};

export { authReducerFunction, initialAuthState };
