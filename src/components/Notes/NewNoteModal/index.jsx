import { useState, useEffect } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { Palette } from "@mui/icons-material";

import "./new-note-modal.css";
import { editArchiveService, editNoteService, postNoteService } from "services";
import { getCreatedDate } from "utils/";
import { useAuth, useNotes } from "contexts";
import { useToastify } from "custom-hook/useToastify";
import { ColorPalette } from "components";
import { notePriorities } from '../note-priorities';

const NewNoteModal = () => {
	const {
		notes,
		showNewNoteForm,
		notesDispatch,
		showSidebar,
		handleShowSidebar,
		isEditing,
		editingNoteId,
        archives,
	} = useNotes();
	const { authToken } = useAuth();

	const initialEmptyFormState = {
		noteTitle: "",
		noteBody: "",
        createdOn: "",
        tags: [],
        noteBackgroundColor: "var(--bg-card-color)",
        isArchived: false,
        notePriority: 'None'
	};

    const initialShowOptions = {
        showColorPalette: false,
    };

	const [noteItem, setNoteItem] = useState(initialEmptyFormState);
    const [formDataError, setFormDataError] = useState(null);
    const [showOptions, setShowOptions] = useState(initialShowOptions);
    const { showToast } = useToastify();

	useEffect(() => {
		if (isEditing === 'note') {
            const noteToBeEdited = notes.find((note) => note._id === editingNoteId);
			setNoteItem(noteToBeEdited);
        }
        if(isEditing === 'archive') {
            const archiveToBeEdited = archives.find((archive) => archive._id === editingNoteId);
			setNoteItem(archiveToBeEdited);
        }

	}, [isEditing]);


	const handleNoteItemChange = ({ target: { name, value } }) => {
		return setNoteItem((prevNoteItem) => ({
			...prevNoteItem,
			[name]: value,
		}));
	};

	const resetNoteFormInput = () => {
		if (showSidebar) handleShowSidebar();
		setNoteItem(initialEmptyFormState);
        setFormDataError(null);
        setShowOptions(initialShowOptions);
	};

	const handleCancelNewNote = () => {
		resetNoteFormInput();
		return notesDispatch({
			action: {
				type: "SHOW_NEW_NOTE_FORM",
				payload: {
					showNewNoteForm: false,
					isEditing: null,
					editingNoteId: -1,
				},
			},
		});
	};

    const handleEditArchived = async () => {
        try {
			const {
				data: { archives },
			} = await editArchiveService(noteItem, authToken);

            notesDispatch({
				action: {
					type: "EDIT_ARCHIVES",
					payload: {
						archives,
                        showNewNoteForm: false,
                        isEditing: null,
                        editingNoteId: -1
					},
				},
			});
			showToast("Edited Note", "info");
			resetNoteFormInput();
		} catch (error) {
            
			showToast("Failed to edit note. Please try again later.", "error");
		}
    }

	const handleEditNote = async () => {
		try {
			const {
				data: { notes },
			} =  await editNoteService(noteItem, authToken);

            notesDispatch({
				action: {
					type: "SET_NOTES",
					payload: {
						notes,
						showNewNoteForm: false,
						isEditing: null,
						editingNoteId: -1,
					},
				},
			});
			showToast("Edited Note", "info");
			resetNoteFormInput();
		} catch (error) {
			showToast("Failed to edit note. Please try again later.", "error");
		}
	};

	const handleAddNote = async (event) => {
		event.preventDefault();
        if(noteItem.noteTitle === '' || noteItem.noteBody === '') {
            setFormDataError("Your note title and body cannot be empty!")
            return;
        }
        setFormDataError(null);
    
		if (isEditing) {
            if(noteItem.isArchived) {
                return handleEditArchived();
            }
			return handleEditNote();
		}
		try {
			const noteCreatedOn = getCreatedDate();
			const {
				data: { notes },
			} = await postNoteService(
				{ ...noteItem, noteCreatedOn },
				{ authorization: authToken, }
			);

			notesDispatch({
				action: {
					type: "SET_NOTES",
					payload: {
						notes,
						showNewNoteForm: false,
						isEditing: null,
						editingNoteId: -1,
					},
				},
			});
			showToast("Created new note.", "success");
			resetNoteFormInput();
		} catch (error) {
			showToast(
				"Failed to create new note. please try again later.",
				"error"
			);
		}
	};

	const { showColorPalette } = showOptions;
	const handleChangeOptions = (option) => {
		switch (option) {
			case "colorPalette":
				setShowOptions((prevShowOptions) => ({
					...initialShowOptions,
					showColorPalette: !prevShowOptions.showColorPalette,
				}));
				break;
		}
	};

    const { noteTitle, noteBody } = noteItem;
	const submitButtonValue = isEditing ? "Edit Note" : "Add Note";
    const noteCardStyle = { backgroundColor: noteItem.noteBackgroundColor };

	return showNewNoteForm ? (
		<div className="new-note-container flex-col flex-align-center flex-justify-center p-2">
			<form
				onSubmit={handleAddNote}
				className="new-note-form note-card flex-col flex-align-start flex-justify-between p-1"
				style={noteCardStyle}
			>
				<input
					type="text"
					value={noteTitle}
					name="noteTitle"
					className="note-title p-0-5"
					onChange={handleNoteItemChange}
					tabIndex="1"
					placeholder="Enter Note Title"
					autoComplete="off"
				/>
				<TextareaAutosize
					className="note-body p-0-5 multline-textarea"
					value={noteBody}
					name="noteBody"
					onChange={handleNoteItemChange}
					tabIndex="2"
					placeholder="Enter Note Body"
					autoComplete="off"
				/>
				<div className="button-container flex-row flex-justify-between flex-align-center mt-1">
					<input
						type="button"
						value="Cancel"
						className="btn btn-primary btn-outline px-0-75 py-0-25"
						onClick={handleCancelNewNote}
						tabIndex="4"
					/>
					<input
						type="submit"
						value={submitButtonValue}
						className="btn btn-primary px-0-75 py-0-25"
						tabIndex="5"
					/>
				</div>
				{formDataError && (
					<p className="text-lg error-color mt-1-5 mx-auto">
						{formDataError}
					</p>
				)}
				<div className="note-actions flex-row flex-justify-center flex-align-center flex-wrap">
					<div className="note-action-wrapper">
						<button
							type="button"
							className="btn btn-icon btn-note-action"
							onClick={() => handleChangeOptions("colorPalette")}
						>
							<span className="icon mui-icon icon-edit">
								{<Palette />}
							</span>
						</button>
						{showColorPalette && (
							<ColorPalette
								handleChangeNoteBackgroundColor={
									handleNoteItemChange
								}
								noteBackgroundColor={
									noteItem.noteBackgroundColor
								}
							/>
						)}
					</div>
					<select
						name="notePriority"
						value={noteItem.notePriority}
						onChange={handleNoteItemChange}
                        className="priority-dropdown px-0-5 py-0-25 text-sm"
					>
						{
                            notePriorities.map(({ priorityId, priority }) => (
                                <option
                                    value={priority}
                                    key={priorityId}
                                >
                                    {priority}
                                </option>
                            ))
                        }
					</select>
				</div>
			</form>
		</div>
	) : null;
};

export { NewNoteModal };
