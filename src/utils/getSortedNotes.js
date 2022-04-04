const getSortedNotes = (filteredNotes, sortBy) => {
	if (sortBy === "") return filteredNotes;

	if (sortBy === "Newest First") {
		return filteredNotes.sort(
			(note1, note2) =>
				new Date(note2.noteCreatedOn) - new Date(note1.noteCreatedOn)
		);
	}
    
	return filteredNotes.sort(
		(note1, note2) =>
			new Date(note1.noteCreatedOn) - new Date(note2.noteCreatedOn)
	);
};

export { getSortedNotes };
