import { NotesList, SearchBar } from "components";
import { useNotes } from "contexts/";
import { getFilteredAndSortedNotes } from "utils";

const Home = () => {
	const { notes, searchText, sortBy, filterByLabel, notesStateLoading, notesStateError, filterByPriority } = useNotes();

	const loadingMessage = (
		<div className="message">
			<p className="success-color text-lg my-1">Loading Notes...</p>
		</div>
	);
	const errorMessage = (
		<div className="message">
			<p className="error-color text-lg my-1">{notesStateError}</p>
		</div>
	);

    const filteredAndSortedNotes = getFilteredAndSortedNotes(notes, searchText, filterByLabel, sortBy, filterByPriority); 

	return (
		<section className="section-wrapper flex-col flex-align-center flex-justify-start">
			{
                notesStateLoading ? (
                    loadingMessage
                ) : notesStateError ? (
                    errorMessage
                ) : (
                    <>
                        { notes.length > 0 && <SearchBar /> }
                        <div className="notes-list-wrapper">
                            {
                                filteredAndSortedNotes.length ? 
                                    <NotesList notes={filteredAndSortedNotes} />
                                : (
                                    <p className="text-lg text-center">
                                        You don't have any notes!
                                    </p>
                                )
                            }
                        </div>
                    </>
			    )
            }
		</section>
	);
};

export { Home };
