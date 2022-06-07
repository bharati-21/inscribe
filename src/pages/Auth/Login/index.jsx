import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../auth.css";
import { loginService } from "services/";
import { useAuth } from "contexts/";
import { useDocumentTitle } from "custom-hook";

const Login = () => {
	const initialFormData = {
		email: "",
		password: "",
		rememberMe: false,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { authError, authLoading, isAuth, authDispatch } = useAuth();
	const setDocumentTitle = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Inscribe | Login");
		const { state } = location;
		!authLoading &&
			isAuth &&
			navigate(state?.from ?? -1, { replace: true });
		return () => {
			if (authError) {
				authDispatch({
					action: {
						type: "SET_AUTH_LOADER_ERROR",
						payload: {
							authLoading: false,
							authError: "",
						},
					},
				});
			}
		};
	}, []);

	const handleFormDataChange = (event) => {
		const { name, value, checked } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === "rememberMe" ? checked : value,
		}));
	};

	const showPasswordIcon = showPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		authDispatch({
			action: {
				type: "SET_AUTH_LOADER_ERROR",
				payload: {
					authLoading: true,
					authError: null,
				},
			},
		});

		try {
			const { data } = await loginService(formData);
			const {
				encodedToken,
				foundUser: { notes, archives, ...otherUserDetails },
			} = data;

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

			if (rememberMe) {
				localStorage.setItem("inscribe-token", encodedToken);
				localStorage.setItem(
					"inscribe-user",
					JSON.stringify(otherUserDetails)
				);
			}

			setFormData(initialFormData);

			navigate(location?.state?.from ?? -1, { replace: true });
		} catch (error) {
			if (error.message.includes(404)) {
				authDispatch({
					action: {
						type: "SET_AUTH_LOADER_ERROR",
						payload: {
							authLoading: false,
							authError: "Login failed. Email not found!",
						},
					},
				});
				return;
			}

			authDispatch({
				action: {
					type: "SET_AUTH_LOADER_ERROR",
					payload: {
						authLoading: false,
						authError:
							"Login failed. Please try again after sometime.",
					},
				},
			});
		}
	};

	const { email, password, rememberMe } = formData;
	const handleChangePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleLoginWithTestCredentials = (event) => {
		setFormData({
			email: process.env.REACT_APP_GUEST_EMAIL,
			password: process.env.REACT_APP_GUEST_PASSWORD,
			rememberMe: true,
		});
	};

	const btnDisabled = authLoading && "btn-disabled";
	const linkDisabled = authLoading && "link-disabled";

	return (
		<section className="section-wrapper auth-main flex-col flex-align-center flex-justify-center mx-auto p-3">
			<div className="auth-wrapper">
				<section className="auth-container login-container mx-auto mb-1 px-1-5">
					<h3 className="text-center text-uppercase auth-head mb-1">
						Login
					</h3>
					<form
						className="auth-form px-1 flex-col flex-align-center flex-justify-center"
						onSubmit={handleFormSubmit}
					>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-login-email"
							>
								Email
								<input
									type="email"
									name="email"
									id="input-login-email"
									className="input-text text-sm px-0-75 py-0-5 mt-0-25"
									placeholder="janedoe@gmail.com"
									value={email}
									onChange={handleFormDataChange}
									disabled={authLoading}
									required
								/>
							</label>
							<span className="text-message mt-0-5"></span>
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-login-psd"
							>
								Password
								<span className="password-input-toggler">
									<input
										type={`${
											showPassword ? "text" : "password"
										}`}
										id="input-login-psd"
										className="input-text px-0-75 py-0-5 mt-0-25 text-sm"
										placeholder="********"
										name="password"
										value={password}
										disabled={authLoading}
										onChange={handleFormDataChange}
										autoComplete="off"
										required
									/>
									<button
										type="button"
										className="btn btn-icon icon-show-psd"
										onClick={handleChangePasswordVisibility}
										disabled={authLoading}
									>
										<span className="icon mui-icon">
											{showPasswordIcon}
										</span>
									</button>
								</span>
							</label>
							<span className="text-message mt-0-5"></span>
						</div>
						<div className="psd-mgmt-container mt-2 flex-row flex-align-center flex-justify-between flex-wrap">
							<label
								htmlFor="checkbox-remember"
								className="flex-row input-checkbox-remember flex-align-center text-sm"
							>
								<input
									type="checkbox"
									className="input-checkbox text-reg"
									id="checkbox-remember"
									disabled={authLoading}
									value={rememberMe}
									onChange={handleFormDataChange}
								/>
								Remember me
							</label>
						</div>
						<div className="auth-button-container mt-1 flex-col flex-align-center">
							<div className="login-button-container flex-col flex-align-center flex-justify-center">
								<input
									type="submit"
									className={`btn btn-primary btn-full-width px-0-75 py-0-25 btn-full-width text-reg ${btnDisabled}`}
									value="Login"
									disabled={authLoading}
								/>
								<input
									type="submit"
									className={`btn btn-primary btn-outline btn-full-width px-0-75 py-0-25 btn-full-width text-reg ${btnDisabled}`}
									value="Login with Test Credentials"
									onClick={handleLoginWithTestCredentials}
									disabled={authLoading}
								/>
							</div>
							<Link
								to="/signup"
								className={`btn btn-link btn-primary mt-0-75 flex-row flex-justify-center flex-align-center ${linkDisabled}`}
							>
								Create a new account
								<span className="icon mui-icon icon-chevron-right">
									<ChevronRightIcon />
								</span>
							</Link>
						</div>
					</form>
				</section>
			</div>
			{authError && <p className="error-color text-lg">{authError}</p>}
			{authLoading && (
				<p className="success-color text-lg">
					Logging in. Please wait...
				</p>
			)}
		</section>
	);
};

export { Login };
