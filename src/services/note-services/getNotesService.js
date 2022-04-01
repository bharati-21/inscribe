import axios from 'axios';

const getNotesService = token => axios.get('/api/notes', { headers: { authorization: token } });

export { getNotesService };