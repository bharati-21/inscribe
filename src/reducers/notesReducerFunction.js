import { notesActions as actionTypes } from './actions';

const initialNotesState = {
	notes: [],
	archives: [],
	notesLoading: true,
	notesError: null,
	showNewNoteForm: false,
	isEditing: null,
	editingNoteId: -1,
};

const notesReducerFunction = (
	prevNotesState,
	{
		action: {
			type,
			payload: {
				notes,
				notesLoading,
				notesError,
				showNewNoteForm,
				isEditing,
				editingNoteId,
				archives,
			},
		},
	}
) => {
	switch (type) {
		case actionTypes.SET_NOTES_SUCCESS:
			return {
				...prevNotesState,
				notes,
				notesLoading,
				notesError,
				showNewNoteForm,
				isEditing,
				editingNoteId,
			};

		case actionTypes.SET_NOTES_ERROR:
			return {
				...prevNotesState,
				notesLoading,
				notesError,
				showNewNoteForm,
				isEditing,
				editingNoteId,
			};

		case actionTypes.RESET_NOTES:
			return initialNotesState;

		case actionTypes.SHOW_NEW_NOTE_FORM:
			return {
				...prevNotesState,
				showNewNoteForm,
				isEditing,
				editingNoteId,
			};

		case actionTypes.SET_ARCHIVES:
			return { ...prevNotesState, notes, archives };

		case actionTypes.EDIT_ARCHIVES:
			return {
				...prevNotesState,
				archives,
				isEditing,
				editingNoteId,
				showNewNoteForm,
			};

		default:
			return prevNotesState;
	}
};

export { notesReducerFunction, initialNotesState };
