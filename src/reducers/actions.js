const notesActions = {
	INIT_NOTES_STATE_SUCCESS: "INIT_NOTES_STATE_SUCCESS",
	INIT_NOTES_STATE_ERROR: "INIT_NOTES_STATE_ERROR",
	SET_NOTES: "SET_NOTES",
	RESET_NOTES: "RESET_NOTES",
	SHOW_NEW_NOTE_FORM: "SHOW_NEW_NOTE_FORM",
	SET_ARCHIVES: "SET_ARCHIVES",
	EDIT_ARCHIVES: "EDIT_ARCHIVES",
	ADD_LABEL: "ADD_LABEL",
	SORT_BY: "SORT_BY",
	FILTER_BY_LABELS: "FILTER_BY_LABELS",
	RESET_FILTERS: "RESET_FILTERS",
	RESTORE_FROM_TRASH: "RESTORE_FROM_TRASH",
};

const authActions = {
	INIT_AUTH: "INIT_AUTH",
	RESET_AUTH: "RESET_AUTH",
};

export { notesActions, authActions };
