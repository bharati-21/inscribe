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
		<section className="section-wrapper profile-section flex-col flex-align-center flex-justify-start mx-auto bootstrap-iso">
			{notesError ? (
				<h4 className="error-color">{notesError}</h4>
			) : notesStateLoading ? (
				<h4 className="success-color">Loading stats...</h4>
			) : (
				<div className="profile-container p-1">
					<h4 className="text-center">
						👋 {authUser.firstName} {authUser.lastName}
					</h4>
					<h5 className="mt-1 text-center">
						Welcome to your inscribe profile!
					</h5>
					{!notesStateLoading && !notesError ? (
						<div className="note-stats-table mt-2">
							<table className="note-stats text-left" border="1">
								<tbody>
									<tr>
										<th>Number of Notes</th>
										<td>{notes?.length}</td>
									</tr>
									<tr>
										<th>Your Archived Notes</th>
										<td>{archives?.length}</td>
									</tr>
									<tr>
										<th>Your Deleted Notes</th>
										<td>{trash?.length}</td>
									</tr>
									<tr>
										<th>Your labels</th>
										<td>{labels?.length}</td>
									</tr>
								</tbody>
							</table>
						</div>
					) : null}
				</div>
			)}
		</section>
	);
};

export { Profile };
