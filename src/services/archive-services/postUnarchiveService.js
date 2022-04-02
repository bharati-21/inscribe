import axios from "axios";

const postUnarchiveService = (archiveData, token) =>
	axios.post(`/api/archives/restore/${archiveData._id}`, archiveData, {
		headers: { authorization: token },
	});

export { postUnarchiveService };
