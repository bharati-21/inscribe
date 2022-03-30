import axios from "axios";

const signupService = signupData =>
	axios.post("/api/auth/signup", signupData);

export { signupService };
