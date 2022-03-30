const actionTypes = {
    INIT_AUTH: 'INIT_AUTH',
    RESET_AUTH: 'RESET_AUTH'
}

const initialAuthState = {
    isAuth: false,
    authToken: '',
    authLoading: false,
    authError: null,
    authUser: {},
};

const authReducerFunction = (prevAuthState, {action: { type, payload: {isAuth, authLoading, authError, authUser, authToken } } }) => {
    
    switch (type) {
        case actionTypes.INIT_AUTH:
            return { ...prevAuthState, isAuth, authLoading, authError, authUser, authToken};
        
        case actionTypes.RESET_AUTH:
            return initialAuthState;

        default: 
            return initialAuthState;
    }
}

export { authReducerFunction, initialAuthState };