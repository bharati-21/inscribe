import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../auth.css";
import { signupService } from "services/";
import { useAuth } from "contexts/";


const Signup = () => {

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { authState: { isAuth, authLoading, authError }, authDispatch } = useAuth();

    useEffect(() => {
        const { state } = location; 
		!authLoading && isAuth && navigate(state?.from ? state.from : '/');
	}, []);
    
    const handleFormDataChange = event => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    }

    const showPasswordIcon = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> 

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await signupService(formData);
            const { encodedToken, createdUser: { notes, archives, ...otherUserDetails } } = data;

            authDispatch({
				action: {
					type: "INIT_AUTH",
					payload: {
						isAuth: true,
						authToken: encodedToken,
						authUser: { ...otherUserDetails },
						authLoading: true,
						authError: null,
					},
				},
			});

            localStorage.setItem("inscribe-token", encodedToken);
			localStorage.setItem("inscribe-user", otherUserDetails);

			const timeoutId = setTimeout(() => {
				setFormData(initialFormData);
                
                authDispatch({
                    action: {
                        type: "INIT_AUTH",
                        payload: {
                            isAuth: true,
                            authToken: encodedToken,
                            authUser: { ...otherUserDetails },
                            authLoading: false,
                            authError: null,
                        },
                    },
                });

				location.state?.from
					? navigate(location.state.from)
					: navigate("/");
			}, 3000);
		} 
        catch (error) {
            console.log(error)
			localStorage.removeItem("inscribe-token");
			localStorage.removeItem("inscribe-user");
			authDispatch({
				action: {
					type: "INIT_AUTH",
					payload: {
						authUser: {},
						authToken: "",
						isAuth: false,
						authLoading: false,
						authError:
							"Signup failed. Please try again after sometime.",
					},
				},
			});
		}
	};

    const { firstName, lastName, email, password } = formData;
    const handleChangePasswordVisibility = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const btnDisabled = authLoading && 'btn-disabled';
    const linkDisabled = authLoading && 'link-disabled'

    return (
        <section className="auth-main flex-col flex-align-center flex-justify-center mx-auto py-2 px-3">
            <div className="auth-wrapper">
                <article className="auth-container signup-container mx-auto mb-1 px-1-5 py-2">
                    <h3 className="text-center text-uppercase auth-head mb-2">
                        Sign Up
                    </h3>
                    <form className="auth-form px-1" onSubmit={handleFormSubmit}>
                        <div className="input-group input-default mt-1-5 mx-auto">
                            <label className="text-label text-reg flex-col mx-auto" htmlFor="input-signup-fname">
                                First Name
                                <input type="text" id="input-signup-fname" className="input-text text-sm px-0-75 py-0-5 mt-0-25" placeholder="Jane" name="firstName" onChange={handleFormDataChange} value={firstName} disabled={authLoading} required />
                            </label>
                            <span className="text-message mt-0-5"></span>
                        </div>
                        <div className="input-group input-default mt-1-5 mx-auto">
                            <label className="text-label text-reg flex-col mx-auto" htmlFor="input-signup-lname">
                                Last Name
                                <input type="text" id="input-signup-lname" className="input-text text-sm px-0-75 py-0-5 mt-0-25" placeholder="Dow" name="lastName" onChange={handleFormDataChange} value={lastName} disabled={authLoading} required />
                            </label>
                            <span className="text-message mt-0-5"></span>
                        </div>
                        <div className="input-group input-default mt-1-5 mx-auto">
                            <label className="text-label text-reg flex-col mx-auto" htmlFor="input-login-email">
                                Email
                                <input type="email" id="input-login-email" className="input-text text-sm px-0-75 py-0-5 mt-0-25" placeholder="janedoe@example.com" name="email" onChange={handleFormDataChange} value={email} disabled={authLoading} required/>
                            </label>
                            <span className="text-message mt-0-5"></span>
                        </div>
                        <div className="input-group input-default mt-1-5 mb-1 mx-auto">
                            <label className="text-label text-reg flex-col mx-auto text-sm" htmlFor="input-psd">
                                Password
                                <span className="password-input-toggler">
                                    <input type={`${showPassword ? 'text' : 'password'}`} id="input-psd" className="input-text px-0-75 py-0-5 mt-0-25 text-sm" placeholder="********" autoComplete='off' name="password" onChange={handleFormDataChange} value={password} required disabled={authLoading} />
                                    <button type="button" className="btn btn-icon icon-show-psd" onClick={handleChangePasswordVisibility} disabled={authLoading} >
                                        <span className="icon mui-icon">
                                            {showPasswordIcon}
                                        </span>
                                    </button>
                                </span>  
                            </label>
                            <span className="text-message mt-0-5"></span>
                        </div> 
                        <div className="psd-mgmt-container mt-2 flex-row flex-align-center flex-justify-between flex-wrap">
                            <label htmlFor="checkbox-remember" className="flex-row input-checkbox-remember flex-align-center text-sm">
                                <input type="checkbox" className="input-checkbox text-reg" id="checkbox-remember" required disabled={authLoading} />
                                I accept terms and conditions
                            </label>
                            <div className="btn btn-link btn-primary btn-forgot-psd text-sm display-none">
                                Forgot password?
                            </div>
                        </div>
                        
                        <div className="auth-button-container mt-1 flex-col flex-align-center">
                            <input type="submit" value="Sign Up" className={`btn btn-primary px-0-75 py-0-25 btn-full-width text-reg ${btnDisabled}`} disabled={authLoading} />
                            <Link to="/login" className={`btn btn-link btn-primary mt-0-75 ${linkDisabled}`}>
                                Already have an account?
                                Login <span className="icon mui-icon icon-chevron-right">
                                    <ChevronRightIcon />
                                </span>
                            </Link>
                        </div>
                    </form>
                </article>  
            </div>      
            {authError && <p className="error-color text-lg">{authError}</p>}
            {authLoading && <p className="success-color text-lg">Signing up. Please wait...</p>}   
        </section>
    )
}

export { Signup };