import { v4 as uuid } from "uuid";
import { notesActions as actionTypes } from "./actions";

const initialNotesState = {
	notes: [],
	archives: [],
	labels: [],
    trash: [],
	notesStateLoading: true,
	notesStateError: null,
	showNewNoteForm: false,
	isEditing: null,
	editingNoteId: -1,
	sortBy: "",
	filterByLabel: [],
};

const notesReducerFunction = (
	prevNotesState,
	{
		action: {
			type,
			payload: {
				notes,
				notesStateLoading,
				notesStateError,
				showNewNoteForm,
				isEditing,
				editingNoteId,
				archives,
				labels,
				label,
				labelId,
				filterByLabel,
				sortBy,
                trash,
			},
		},
	}
) => {
	switch (type) {
		case actionTypes.SET_NOTES:
			return {
				...prevNotesState,
				notes,
                trash: trash || prevNotesState.trash,
				showNewNoteForm,
				isEditing,
				editingNoteId,
			};

		case actionTypes.INIT_NOTES_STATE_SUCCESS:
			return {
				...prevNotesState,
				notes,
				archives,
				notesStateLoading,
				notesStateError,
				showNewNoteForm,
				isEditing,
				editingNoteId,
				labels,
                trash,
			};

		case actionTypes.INIT_NOTES_STATE_ERROR:
			return {
				...initialNotesState,
				showNewNoteForm,
				isEditing,
				editingNoteId,
				notesStateLoading,
				notesStateError,
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
                trash,
				isEditing,
				editingNoteId,
				showNewNoteForm,
			};

		case actionTypes.ADD_LABEL:
			return {
				...prevNotesState,
				labels: [...prevNotesState.labels, { label, id: labelId }],
			};

		case actionTypes.FILTER_BY_LABELS:
			return {
				...prevNotesState,
				filterByLabel,
			};

		case actionTypes.SORT_BY:
			return {
				...prevNotesState,
				sortBy,
			};

		case actionTypes.RESET_FILTERS:
			return {
				...prevNotesState,
				sortBy,
				filterByLabel,
			};

        case actionTypes.RESTORE_FROM_TRASH:
            return {
                ...prevNotesState,
                notes,
                archives,
                trash
            }

		default:
			return prevNotesState;
	}
};

export { notesReducerFunction, initialNotesState };
