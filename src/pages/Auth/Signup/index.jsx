import { useState, useEffect, useReducer } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../auth.css";
import { signupService } from "services/";
import { useAuth } from "contexts/";
import { useDocumentTitle, useToastify } from "custom-hook";
import { isFormDataValid } from "utils";

const Signup = () => {
	const initialFormData = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState(null);

	const initialErrorState = {
		firstNameError: null,
		lastNameError: null,
		passwordError: null,
		confirmPasswordError: null,
	};

	const errorReducer = (state, { type, payload: { error, errorValue } }) => {
		switch (type) {
			case "RESET_ERROR_STATES":
				return { ...initialErrorState };
			case "SET_ERROR":
				return { ...state, [error]: errorValue };
		}
	};

	const [formDataError, setFormDataError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const navigate = useNavigate();
	const location = useLocation();
	const { showToast } = useToastify();

	const { isAuth, authLoading, authError, authDispatch } = useAuth();

	const setDocumentTitle = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Inscribe | Signup");
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
		const { name, value } = event.target;
		if (formDataError[name + "Error"]) {
			setFormDataError({
				type: "SET_ERROR",
				payload: { error: name + "Error", errorValue: null },
			});
		}
		if (error) {
			setError(null);
		}

		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const showPasswordIcon = showPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);
	const showConfirmPasswordIcon = showConfirmPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);

	const { firstName, lastName, email, password, confirmPassword } = formData;

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (
			!isFormDataValid(
				firstName,
				lastName,
				password,
				confirmPassword,
				setFormDataError,
				setError
			)
		) {
			return;
		}

		if (password !== confirmPassword) {
			showToast("Password and Confirm Password do not match", "error");
			return;
		}

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
			const { data } = await signupService(formData);
			const {
				encodedToken,
				createdUser: { notes, archives, ...otherUserDetails },
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

			setFormData(initialFormData);

			navigate(location?.state?.from ?? "/", { replace: true });
		} catch (error) {
			if (error.message.includes(422)) {
				authDispatch({
					action: {
						type: "SET_AUTH_LOADER_ERROR",
						payload: {
							authLoading: false,
							authError: "Signup failed. Email already in use!",
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
							"Signup failed. Please try again after sometime.",
					},
				},
			});
		}
	};

	const {
		firstNameError,
		lastNameError,
		passwordError,
		confirmPasswordError,
	} = formDataError;

	const handleChangePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	const handleChangeConfirmPasswordVisibility = () =>
		setShowConfirmPassword(
			(prevShowConfirmPassword) => !prevShowConfirmPassword
		);

	const btnDisabled = authLoading && "btn-disabled";
	const linkDisabled = authLoading && "link-disabled";

	return (
		<section className="auth-main section-wrapper flex-col flex-align-center flex-justify-start mx-auto py-2 px-3">
			<div className="auth-wrapper">
				<article className="auth-container signup-container mx-auto mb-1 px-1-5 py-2">
					<h3 className="text-center text-uppercase auth-head mb-2">
						Sign Up
					</h3>
					<form
						className="auth-form px-1"
						onSubmit={handleFormSubmit}
					>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-signup-fname"
							>
								First Name
								<input
									type="text"
									id="input-signup-fname"
									className="input-text text-sm px-0-75 py-0-5 mt-0-25"
									placeholder="Jane"
									name="firstName"
									onChange={handleFormDataChange}
									value={firstName}
									disabled={authLoading}
									required
								/>
							</label>
							<span className="text-message error-color mt-0-5">
								{firstNameError}
							</span>
						</div>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-signup-lname"
							>
								Last Name
								<input
									type="text"
									id="input-signup-lname"
									className="input-text text-sm px-0-75 py-0-5 mt-0-25"
									placeholder="Dow"
									name="lastName"
									onChange={handleFormDataChange}
									value={lastName}
									disabled={authLoading}
									required
								/>
							</label>
							<span className="text-message error-color mt-0-5">
								{lastNameError}
							</span>
						</div>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-login-email"
							>
								Email
								<input
									type="email"
									id="input-login-email"
									className="input-text text-sm px-0-75 py-0-5 mt-0-25"
									placeholder="janedoe@example.com"
									name="email"
									onChange={handleFormDataChange}
									value={email}
									disabled={authLoading}
									required
								/>
							</label>
							<span className="text-message error-color mt-0-5"></span>
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-psd"
							>
								Password
								<span className="password-input-toggler">
									<input
										type={`${
											showPassword ? "text" : "password"
										}`}
										id="input-psd"
										className="input-text px-0-75 py-0-5 mt-0-25 text-sm"
										placeholder="********"
										autoComplete="off"
										name="password"
										onChange={handleFormDataChange}
										value={password}
										required
										disabled={authLoading}
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
							<span className="text-message error-color mt-0-5">
								{passwordError}
							</span>
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-confirm-psd"
							>
								Confirm Password
								<span className="password-input-toggler">
									<input
										type={`${
											showConfirmPassword
												? "text"
												: "password"
										}`}
										id="input-confirm-psd"
										className="input-text px-0-75 py-0-5 mt-0-25 text-sm"
										placeholder="********"
										autoComplete="off"
										name="confirmPassword"
										onChange={handleFormDataChange}
										value={confirmPassword}
										required
										disabled={authLoading}
									/>
									<button
										type="button"
										className={`btn btn-icon icon-show-psd ${
											authLoading && "btn-disabled"
										}`}
										onClick={
											handleChangeConfirmPasswordVisibility
										}
										disabled={authLoading}
									>
										<span className="icon mui-icon">
											{showConfirmPasswordIcon}
										</span>
									</button>
								</span>
							</label>
							<span className="text-message error-color mt-0-5">
								{confirmPasswordError}
							</span>
						</div>
						{error ? <p className="error-color">{error}</p> : null}
						{authError && (
							<p className="error-color text-lg">{authError}</p>
						)}
						<div className="psd-mgmt-container mt-2 flex-row flex-align-center flex-justify-between flex-wrap">
							<label
								htmlFor="checkbox-remember"
								className="flex-row input-checkbox-remember flex-align-center text-sm"
							>
								<input
									type="checkbox"
									className="input-checkbox text-reg"
									id="checkbox-remember"
									required
									disabled={authLoading}
								/>
								I accept terms and conditions
							</label>
						</div>

						<div className="auth-button-container mt-1 flex-col flex-align-center">
							<input
								type="submit"
								value="Sign Up"
								className={`btn btn-primary px-0-75 py-0-25 btn-full-width text-reg ${btnDisabled}`}
								disabled={authLoading}
							/>
							<Link
								to="/login"
								className={`btn btn-link btn-primary mt-0-75 ${linkDisabled}`}
							>
								Already have an account? Login{" "}
								<span className="icon mui-icon icon-chevron-right">
									<ChevronRightIcon />
								</span>
							</Link>
						</div>
					</form>
				</article>
			</div>

			{authLoading && (
				<p className="success-color text-lg">
					Signing up. Please wait...
				</p>
			)}
		</section>
	);
};

export { Signup };
