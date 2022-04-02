import { NotesList } from "components";
import { useNotes } from "contexts/";

const Archive = () => {
    const { archives } = useNotes();
	return (
		<section className="section-wrapper flex-col flex-align-center flex-justify-start">
			<div className="notes-list-wrapper">
				{archives.length ? (
					<NotesList notes={archives} />
				) : (
					<p className="text-lg text-center">
						You don't have any archived notes!
					</p>
				)}
			</div>
		</section>
	);
};

export { Archive };
