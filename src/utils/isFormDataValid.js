const isFormDataValid = (
	firstName,
	lastName,
	password,
	confirmPassword,
	setFormDataError,
	setError
) => {
	const isMinPasswordLength = (password) => password.trim().length >= 7;
	const isMinNameLength = (name) => name.trim().length >= 2;

	const isPasswordValid = (passwordValue) =>
		/^(?=.{7,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!_*@#$%^&+=]).*$/.test(
			passwordValue
		);
	const isNameValid = (name) => /^[A-Za-z]{2,20}$/.test(name);

	if (!isMinNameLength(firstName)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "firstNameError",
				errorValue:
					"Invalid first name. Name must have least 2 characters.",
			},
		});
		return false;
	}
	if (!isNameValid(firstName)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "firstNameError",
				errorValue:
					"Invalid first name. Name should only contain letters.",
			},
		});
		return false;
	}

	if (!isMinNameLength(lastName)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "lastNameError",
				errorValue:
					"Invalid first name. Name must have least 2 characters.",
			},
		});
		return false;
	}

	if (!isNameValid(lastName)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "lastNameError",
				errorValue:
					"Invalid lastName name. Name should only contain letters.",
			},
		});
		return false;
	}

	if (!isMinPasswordLength(password)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "passwordError",
				errorValue:
					"Invalid password. Password must have least 7 characters.",
			},
		});
		return false;
	}

	if (!isPasswordValid(password)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "passwordError",
				errorValue:
					"Invalid password. Password should contain at least one lowercase, uppercase, number and a special character.",
			},
		});
		return false;
	}

	if (!isMinPasswordLength(confirmPassword)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "confirmPasswordError",
				errorValue:
					"Invalid password. Should contain at least one lowercase, uppercase, number and a special character.",
			},
		});
		return false;
	}

	if (!isPasswordValid(confirmPassword)) {
		setFormDataError({
			type: "SET_ERROR",
			payload: {
				error: "confirmPasswordError",
				errorValue:
					"Invalid confirm password. Should contain at least one lowercase, uppercase, number and a special character.",
			},
		});
		return false;
	}

	if (password !== confirmPassword) {
		setError("Passwords do not match");
		return false;
	}
	return true;
};

export { isFormDataValid };
