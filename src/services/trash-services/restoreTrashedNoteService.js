import axios from 'axios';

const restoreTrashedNoteService = (noteId, token) => axios.post(`/api/trash/restore/${noteId}`, {}, { headers: { authorization: token } } );

export { restoreTrashedNoteService };