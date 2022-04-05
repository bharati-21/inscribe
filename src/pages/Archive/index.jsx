import { NotesList, SearchBar } from "components";
import { useNotes } from "contexts/";
import { getFilteredAndSortedNotes } from "utils";

const Archive = () => {
	const {
		archives,
		searchText,
		filterByLabel,
		sortBy,
		notesStateLoading,
		notesStateError,
	} = useNotes();

	const filteredAndSortedArchives = getFilteredAndSortedNotes(
		archives,
		searchText,
		filterByLabel,
		sortBy
	);

	const loadingMessage = (
		<div className="message">
			<p className="success-color text-lg my-1">
				Loading Archived Notes...
			</p>
		</div>
	);

	const errorMessage = (
		<div className="message">
			<p className="error-color text-lg my-1">{notesStateError}</p>
		</div>
	);

  const filteredAndSortedArchives = getFilteredAndSortedNotes(archives, searchText, filterByLabel, sortBy); 


	return (
		<section className="section-wrapper flex-col flex-align-center flex-justify-start">
			{
                notesStateLoading ? (
                    loadingMessage
                ) : notesStateError ? (
                    errorMessage
                ) : (
                    <>
                        { archives.length > 0 && <SearchBar noteType="archives" /> }
                        <div className="notes-list-wrapper">
                            {
                                filteredAndSortedArchives.length ? 
                                    <NotesList notes={filteredAndSortedArchives} />
                                : (
                                    <p className="text-lg text-center">
                                        You don't have any archived notes!
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

export { Archive };
