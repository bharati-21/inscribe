import axios from 'axios';

const deleteNoteService = (id, token) => {
    return axios.delete(`/api/notes/${id}`, { headers: { authorization: token } })
};

export { deleteNoteService };