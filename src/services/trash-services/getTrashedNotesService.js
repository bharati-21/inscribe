import axios from "axios";

const getTrashedNotesService = (token) =>
	axios.get("/api/trash", { headers: { authorization: token } });

export { getTrashedNotesService };
