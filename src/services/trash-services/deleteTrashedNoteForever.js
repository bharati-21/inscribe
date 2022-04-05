import axios from 'axios';

const deleteTrashedNoteForever = (noteId, token) => axios.delete(`/trash/delete/${noteId}`, { headers: { authorization: token } } );

export { deleteTrashedNoteForever };