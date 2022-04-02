import axios from "axios";

const deleteArchivedNoteService = (id, token) =>
	axios.delete(`/api/archives/delete/${id}`, {
		headers: { authorization: token },
	});

export { deleteArchivedNoteService };
