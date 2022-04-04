const getFilteredNotes = (notes, searchText, filterByLabel) => {
	const notesFilteredBySearchText = getNotesFilteredBySearchText(
		notes,
		searchText.toLowerCase()
	);

	const notesFilteredByLabel = getNotesFilteredByLabel(
		notesFilteredBySearchText,
		filterByLabel
	);

	return notesFilteredByLabel;
};

const getNotesFilteredBySearchText = (notes, searchText) =>
	notes.filter(
		({ noteTitle, noteBody }) =>
			noteTitle.toLowerCase().includes(searchText) ||
			noteBody.toLowerCase().includes(searchText)
	);

const getNotesFilteredByLabel = (notes, filterByLabel) => {
	if (filterByLabel.every((filter) => !filter.filtered)) return notes;

    return filterByLabel.reduce((notesAccumulator, { id, filtered }) => [...notesAccumulator, ...notes.filter(note => filtered && !notesAccumulator.find(({ _id }) => note._id === _id) ? note.tags.find(tag => tag.id === id) : false)], []) 
}

export { getFilteredNotes };
