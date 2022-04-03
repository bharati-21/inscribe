import { v4 as uuid } from "uuid";
import { notesActions as actionTypes } from "./actions";

const initialNotesState = {
	notes: [],
	archives: [],
	labels: [],
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
				label,
				labelId,
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

		case actionTypes.ADD_LABEL:
			return {
				...prevNotesState,
				labels: [...prevNotesState.labels, { label, id: labelId }],
			};

		default:
			return prevNotesState;
	}
};

export { notesReducerFunction, initialNotesState };
