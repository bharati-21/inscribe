import axios from "axios";

const getArchivedNotesService = (token) =>
	axios.get("/api/archives", { headers: { authorization: token } });

export { getArchivedNotesService };
