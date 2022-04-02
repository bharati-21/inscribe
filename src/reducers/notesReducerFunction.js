const actionTypes = {
	SET_NOTES_SUCCESS: "SET_NOTES_SUCCESS",
	SET_NOTES_ERROR: "SET_NOTES_ERROR",
	RESET_NOTES: "RESET_NOTES",
	SHOW_NEW_NOTE_FORM: "SHOW_NEW_NOTE_FORM",
	EDIT_NOTE: "EDIT_NOTE",
};

const initialNotesState = {
	notes: [],
	notesLoading: true,
	notesError: null,
	showNewNoteForm: false,
	isEditing: false,
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

		default:
			return prevNotesState;
	}
};

export { notesReducerFunction, initialNotesState };
