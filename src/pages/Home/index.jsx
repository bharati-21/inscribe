import { NotesList, SearchBar } from "components";
import { useNotes } from "contexts/";
import { getFilteredAndSortedNotes } from "utils";

const Home = () => {
	const { notes, notesLoading, notesError, searchText, sortBy, filterByLabel } = useNotes();

	const loadingMessage = notesLoading && (
		<div className="message">
			<p className="success-color text-lg my-1">Loading Notes...</p>
		</div>
	);
	const errorMessage = notesError && (
		<div className="message">
			<p className="error-color text-lg my-1">{notesError}</p>
		</div>
	);

    const filteredAndSortedNotes = getFilteredAndSortedNotes(notes, searchText, filterByLabel, sortBy); 

	return (
		<section className="section-wrapper flex-col flex-align-center flex-justify-start">
			{loadingMessage ? (
				loadingMessage
			) : (
				<>
					{errorMessage}
                    <SearchBar />
					<div className="notes-list-wrapper">
						{filteredAndSortedNotes.length ? (
							<NotesList notes={filteredAndSortedNotes} />
						) : (
							<p className="text-lg text-center">You don't have any notes!</p>
						)}
					</div>
				</>
			)}
		</section>
	);
};

export { Home };
