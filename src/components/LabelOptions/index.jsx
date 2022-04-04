import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useAuth, useNotes } from "contexts";
import "./label-options.css";
import { editArchiveService, editNoteService } from "services/";
import { useToastify } from "custom-hook/useToastify";

const LabelOptions = ({ note }) => {
	const { labels, notesDispatch } = useNotes();
	const { authToken } = useAuth();

	const { showToast } = useToastify();

	const findIfLabelInNote = (id) =>
		note.tags.find((tag) => tag.id === id) ? true : false;

	const [labelOptions, setLabelOptions] = useState(
		labels.map((label) => ({
			...label,
			checked: findIfLabelInNote(label.id),
		}))
	);

	const [newLabel, setNewLabel] = useState("");

	useEffect(() => {
		setLabelOptions(
			labels.map((label) => ({
				...label,
				checked: findIfLabelInNote(label.id),
			}))
		);
	}, [labels, note.tags]);

	const getUpdatedNoteTags = (action, id, label) => {
		switch (action) {
			case "REMOVE_TAG":
				return {
					...note,
					tags: note.tags.filter((tag) => tag.id !== id),
				};
			case "ADD_TAG":
				return { ...note, tags: [...note.tags, { id, label }] };
		}
	};

	const postEditedNoteAndDispatch = async (updatedNote) => {
		try {
			if (updatedNote.isArchived) {
				const {
					data: { archives },
				} = await editArchiveService(updatedNote, authToken);

				notesDispatch({
					action: {
						type: "EDIT_ARCHIVES",
						payload: {
							archives,
							isEditing: null,
							showNewNoteForm: false,
							editingNoteId: -1,
						},
					},
				});
			} else {
				const {
					data: { notes },
				} = await editNoteService(updatedNote, authToken);
				notesDispatch({
					action: {
						type: "SET_NOTES_SUCCESS",
						payload: {
							notes,
							notesLoading: false,
							notesError: null,
							showNewNoteForm: false,
							isEditing: null,
							editingNoteId: -1,
						},
					},
				});
			}
			showToast("Updated labels.", "success");
		} catch (error) {
			showToast(
				"Error occured while updating labels. Try again later.",
				"error"
			);
		}
	};

	const handleChangeNoteTags = (id) => {
		setLabelOptions((prevLabelOptions) =>
			prevLabelOptions.map((prevLabelOption) =>
				prevLabelOption.id === id
					? { ...prevLabelOption, checked: !prevLabelOption.checked }
					: prevLabelOption
			)
		);

		const { checked, label } = labelOptions.find(
			(label) => label.id === id
		);
		const updatedNote = getUpdatedNoteTags(
			checked ? "REMOVE_TAG" : "ADD_TAG",
			id,
			label
		);

		postEditedNoteAndDispatch(updatedNote);
	};

	const handleAddNewLabel = ({ keyCode, target: { value } }) => {
		if (keyCode === 13 && value.trim() !== "") {
			const labelId = uuid();

			const updatedNote = getUpdatedNoteTags(
				"ADD_TAG",
				labelId,
				newLabel
			);
			postEditedNoteAndDispatch(updatedNote);

			notesDispatch({
				action: {
					type: "ADD_LABEL",
					payload: { label: newLabel.trim(), labelId },
				},
			});

			setNewLabel("");
		} else if (keyCode === 13 && value.trim() === "") {
			showToast("Label cannot be empty.", "error");
		}
	};

	const handleNewLabelChange = (e) => {
		setNewLabel(e.target.value);
	};

	return (
		<div className="option-wrapper flex-col flex-align-center flex-justify-center">
			<div className="label-input-wrapper">
				<input
					type="text"
					className="label-input text-lg"
					value={newLabel}
					onChange={handleNewLabelChange}
					placeholder="Type and press enter to create a new label"
					onKeyDown={handleAddNewLabel}
				/>
			</div>

			{labelOptions.length > 0 && (
				<div className="label-checkbox-wrapper flex-row flex-align-center flex-justify-start flex-wrap">
					{labelOptions.map(({ id, checked, label }) => (
						<label
							className="flex-row flex-align-center flex-justify-center text-reg"
							key={id}
						>
							<input
								type="checkbox"
								className="label-checkbox"
								value={label}
								onChange={() => handleChangeNoteTags(id)}
								checked={checked}
							/>
							{label}
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export { LabelOptions };
