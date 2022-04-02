import axios from "axios";

const editArchiveService = (archive, token) =>
	axios.post(
		`/api/archives/${archive._id}`,
		{ archive },
		{ headers: { authorization: token } }
	);

export { editArchiveService };
