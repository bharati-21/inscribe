import axios from "axios";

const postArchiveService = (archiveData, token) =>
	axios.post(`/api/notes/archives/${archiveData._id}`, archiveData, {
		headers: { authorization: token },
	});

export { postArchiveService };
