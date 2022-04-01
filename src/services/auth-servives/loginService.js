import axios from "axios";

const loginService = formData =>
	axios.post("/api/auth/login", formData);

export { loginService };
