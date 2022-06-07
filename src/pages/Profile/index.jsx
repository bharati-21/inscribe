import { useAuth, useNotes } from "contexts";
import { useDocumentTitle } from "custom-hook";
import { useEffect } from "react";
import "./profile.css";

const Profile = () => {
	const { authUser } = useAuth();
	const { notes, archives, labels, trash, notesStateLoading, notesError } =
		useNotes();

	const setDocumentTitle = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Inscribe | Profile");
	}, []);

	return (
		<section className="section-wrapper profile-section flex-col flex-align-center flex-justify-center mx-auto">
			<div className="profile-container p-1">
				<h3 className="text-center flex-col flex-justify-center flex-align-center">
					👋 {authUser.firstName} {authUser.lastName}
					<span className="mt-0-5">
						Welcome to your inscribe profile!
					</span>
				</h3>
				{!notesStateLoading && !notesError ? (
					<ul className="list flex-col mt-2 flex-justify-center flex-align-center list-spaced list-style-none notes-stats">
						<li>
							Number of notes: <span>{notes?.length}</span>
						</li>
						<li>
							Your archived notes: <span>{archives?.length}</span>
						</li>
						<li>
							Your delete notes: <span>{trash?.length}</span>
						</li>
						<li>
							Your labels: <span>{labels?.length}</span>
						</li>
					</ul>
				) : null}
			</div>
		</section>
	);
};

export { Profile };
