import { NotesList } from "components";
import { useNotes } from "contexts/";

const Archive = () => {
    const { archives, notesStateLoading, notesStateError } = useNotes();

	const loadingMessage = (
		<div className="message">
			<p className="success-color text-lg my-1">Loading Archived Notes...</p>
		</div>
	);

	const errorMessage = (
		<div className="message">
			<p className="error-color text-lg my-1">{notesStateError}</p>
		</div>
	);

	return (
		<section className="section-wrapper flex-col flex-align-center flex-justify-start">
            {
                notesStateLoading ? (
                    loadingMessage
                ) : notesStateError ? (
                    errorMessage
                ) : (
                    <div className="notes-list-wrapper">
                        {archives.length ? (
                            <NotesList notes={archives} />
                        ) : (
                            <p className="text-lg text-center">
                                You don't have any archived notes!
                            </p>
                        )}
                    </div>
                )
            }
		</section>
	);
};

export { Archive };
