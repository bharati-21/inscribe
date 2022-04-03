import axios from "axios";

const postNoteService = (newNote, header) =>
	axios.post("/api/notes", { note: newNote }, { headers: header });

export { postNoteService };
