const { useState } = require("react");
import TextareaAutosize from "react-textarea-autosize";
import {
	PushPinOutlined,
	PushPin,
	Edit,
	Archive,
	Delete,
	Palette,
	Unarchive,
	Label,
	RestoreFromTrash,
	DeleteForever,
} from "@mui/icons-material";

import { ColorPalette, LabelOptions } from "components/";
import {
	deleteNoteService,
	postArchiveService,
	postUnarchiveService,
	deleteArchivedNoteService,
	restoreTrashedNoteService,
  editNoteService,
  editArchiveService,
} from "services";
import { useAuth, useNotes } from "contexts";
import { useToastify } from "custom-hook/useToastify";
import { notePriorities } from '../note-priorities';

const NoteItem = ({ note }) => {
	const { _id, noteTitle, noteBody, noteCreatedOn, isArchived, tags, noteBackgroundColor, notePriority } = note;

	const initialShowOptions = {
		showColorPalette: false,
		showLabelOptions: false,
	};

	const [showOptions, setShowOptions] = useState({
		showColorPalette: false,
		showLabelOptions: false,
	});

	const [pinned, setPinned] = useState(false);

	const { showColorPalette, showLabelOptions } = showOptions;

	const { authToken } = useAuth();
	const { notesDispatch, trash } = useNotes();

	const { showToast } = useToastify();

	const itemInTrash = trash.find((note) => note._id === _id);

	const handleChangeOptions = (option) => {
		switch (option) {
			case "colorPalette":
				setShowOptions((prevShowOptions) => ({
					...initialShowOptions,
					showColorPalette: !prevShowOptions.showColorPalette,
				}));
				break;
			case "labelOptions":
				setShowOptions((prevShowOptions) => ({
					...initialShowOptions,
					showLabelOptions: !prevShowOptions.showLabelOptions,
				}));
				break;
		}
	};

	const handleDeleteArchivedNote = async () => {
		try {
			const {
				data: { archives, trash },
			} = await deleteArchivedNoteService(_id, authToken);
			notesDispatch({
				action: {
					type: "EDIT_ARCHIVES",
					payload: {
						archives,
						trash,
						showNewNote: false,
						isEditing: null,
						editingNoteId: -1,
					},
				},
			});

			showToast("Note deleted.", "success");
		} catch (error) {
			showToast(
				"Could note delete note. Try again after sometime!",
				"error"
			);
		}
	};

	const handleDeleteNote = async () => {
		if (isArchived) return handleDeleteArchivedNote();
		try {
			const {
				data: { notes, trash },
			} = await deleteNoteService(_id, authToken);
			notesDispatch({
				action: {
					type: "SET_NOTES",
					payload: {
						notes: notes,
						trash: trash,
						showNewNote: false,
						isEditing: null,
						editingNoteId: -1,
					},
				},
			});

			showToast("Note deleted.", "success");
		} catch (error) {
			showToast(
				"Could note delete note. Try again after sometime!",
				"success"
			);
		}
	};

	const handleEditNote = () => {
		notesDispatch({
			action: {
				type: "SHOW_NEW_NOTE_FORM",
				payload: {
					showNewNoteForm: true,
					isEditing: isArchived ? "archive" : "note",
					editingNoteId: _id,
				},
			},
		});
	};

	const handleArchiveNote = async () => {
		try {
			const {
				data: { notes, archives },
			} = isArchived
				? await postUnarchiveService(note, authToken)
				: await postArchiveService(note, authToken);

			showToast(
				isArchived ? "Note unarchived" : "Note archived",
				"success"
			);
			notesDispatch({
				action: {
					type: "SET_ARCHIVES",
					payload: {
						notes,
						archives,
					},
				},
			});
		} catch (error) {
			showToast(
				isArchived
					? "Note could not be unarchived. Try again later"
					: "Note could not be archived. Try again later",
				"error"
			);
		}
	};

    const handleRestoreTrashedNote = async () => {
		try {
			const {
				data: { trash, notes, archives },
			} = await restoreTrashedNoteService(_id, authToken);

			notesDispatch({
				action: {
					type: "RESTORE_FROM_TRASH",
					payload: { trash, notes, archives },
				},
			});
			showToast("Restored note from trash.", "success");
		} catch (error) {
			showToast(
				"Could not restore note from trash. Try again later.",
				"error"
			);
		}
	};

	const handleDeleteTrashedNoteForever = async () => {
		try {
			const {
				data: { trash },
			} = await restoreTrashedNoteService(_id, authToken);

			notesDispatch({
				action: {
					type: "SET_TRASH",
					payload: { trash },
				},
			});
			showToast("Deleted note from trash.", "success");
		} catch (error) {
			showToast(
				"Could not delete note from trash. Try again later.",
				"error"
			);
		}
	};

    const changeArchivedNoteBackgroundColor = async event => {
        const newBackgroundColor = event.target.value;
        const updatedArchive = { ...note, noteBackgroundColor: newBackgroundColor }        
        try {
            const {
                data: { archives },
            } = await editArchiveService(updatedArchive, authToken);
            notesDispatch({
                action: {
                    type: "EDIT_ARCHIVES",
                    payload: {
                        archives,
                        showNewNoteForm: false,
                        isEditing: null,
                        editingNoteId: -1,
                    },
                },
            });
            showToast('Note background color updated!', 'success');
        }
        catch(error) {
            showToast('Could not update note background color. Try again later!', 'error');
        }
    } 

    const handleChangeNoteBackgroundColor = async event => {
        const newBackgroundColor = event.target.value;
        if(isArchived) {
            changeArchivedNoteBackgroundColor(event);
            return;
        }
        const updatedNote = { ...note, noteBackgroundColor: newBackgroundColor }
        
        try {
            const {
                data: { notes },
            } = await editNoteService(updatedNote, authToken);
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
            showToast('Note background color updated!', 'success');
        }
        catch(error) {
            showToast('Could not update note background color. Try again later!', 'error');
        }
    }

    const changeArchivedNotePriority = async event => {
        const newNotePriority = event.target.value;
        const updatedArchive = { ...note, notePriority: newNotePriority }        
        try {
            const {
                data: { archives },
            } = await editArchiveService(updatedArchive, authToken);
            notesDispatch({
                action: {
                    type: "EDIT_ARCHIVES",
                    payload: {
                        archives,
                        showNewNoteForm: false,
                        isEditing: null,
                        editingNoteId: -1,
                    },
                },
            });
            showToast('Note priority updated', 'success');
        }
        catch(error) {
            showToast('Could not update note priority. Try again later!', 'error');
        }
    }

    const handleChangeNotePriority = async event => {
        const newNotePriority = event.target.value;
        if(isArchived) {
            changeArchivedNotePriority(event);
            return;
        }
        const updatedNote = { ...note, notePriority: newNotePriority }
        
        try {
            const {
                data: { notes },
            } = await editNoteService(updatedNote, authToken);
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
            showToast('Note priority updated.', 'success');
        }
        catch(error) {
            showToast('Could not update note priority. Try again later!', 'error');
        }
    }
 
	const pinIcon = pinned ? <PushPin /> : <PushPinOutlined />;
	const archiveIcon = isArchived ? <Unarchive /> : <Archive />;
	const mappedTags = tags.length > 0 && (
		<div className="notes-tag-list flex-row flex-align-center flex-justify-start flex-wrap">
			{tags.map(({ label, id }) => (
				<span
					className="badge badge-primary py-0-25 px-0-5 text-sm"
					key={id}
				>
					{label}
				</span>
			))}
		</div>
	);

	const handleRestoreTrashedNote = async () => {
		try {
			const {
				data: { trash, notes, archives },
			} = await restoreTrashedNoteService(_id, authToken);

			notesDispatch({
				action: {
					type: "RESTORE_FROM_TRASH",
					payload: { trash, notes, archives },
				},
			});
			showToast("Restored note from trash.", "success");
		} catch (error) {
			showToast(
				"Could not restore note from trash. Try again later.",
				"error"
			);
		}
	};

	const handleDeleteTrashedNoteForever = async () => {
		try {
			const {
				data: { trash },
			} = await restoreTrashedNoteService(_id, authToken);

			notesDispatch({
				action: {
					type: "SET_TRASH",
					payload: { trash },
				},
			});
			showToast("Deleted note from trash.", "success");
		} catch (error) {
			showToast(
				"Could not delete note from trash. Try again later.",
				"error"
			);
		}
	};

	const trashNoteActions = (
		<div className="note-actions flex-row flex-justify-center flex-align-center flex-wrap">
			<button
				className="btn btn-icon btn-note-action"
				onClick={handleRestoreTrashedNote}
			>
				<span className="icon mui-icon icon-restore-trash">
					{<RestoreFromTrash />}
				</span>
			</button>
			<button
				className="btn btn-icon btn-note-action"
				onClick={handleDeleteTrashedNoteForever}
			>
				<span className="icon mui-icon icon-delete-forever">
					{<DeleteForever />}
				</span>
			</button>
		</div>
	);

    const noteStyle = { backgroundColor: noteBackgroundColor };

	return (
		<div
			className={`note note-card p-1 flex-col flex-align-start flex-justify-between`}
            style={noteStyle}
		>
			<input
				type="text"
				value={noteTitle}
				className="note-title p-0-5"
				readOnly
			/>
			<TextareaAutosize
				className="note-body p-0-5 pr-0-75"
				value={noteBody}
				readOnly
			/>
			{mappedTags}

      <div className="note-info flex-row flex-align-center flex-justify-between flex-wrap">
				<div className="note-timestamp text-sm secondary-color">
					{noteCreatedOn}
				</div>
				{
                    itemInTrash
					    ? isArchived && (
							<p className="text-sm gray-color">Archived Note</p>
					    )
					: 
                        null
                }
				{
                    itemInTrash ? (
					    trashNoteActions
				    ) 
                    : (
                        <div className="note-actions flex-row flex-justify-center flex-align-center flex-wrap">
                            <button
                                className="btn btn-icon btn-note-action"
                                onClick={handleEditNote}
                            >
                                <span className="icon mui-icon icon-edit">
                                    {<Edit />}
                                </span>
                            </button>
                            <div className="note-action-wrapper">
                                <button
                                    className="btn btn-icon btn-note-action"
                                    onClick={() =>
                                        handleChangeOptions("colorPalette")
                                    }
                                >
                                    <span className="icon mui-icon icon-edit">
                                        {<Palette />}
                                    </span>
                                </button>
                                {showColorPalette && <ColorPalette handleChangeNoteBackgroundColor={handleChangeNoteBackgroundColor} noteBackgroundColor={noteBackgroundColor} />}
                            </div>
                            <div className="note-action-wrapper">
                                <button
                                    className="btn btn-icon btn-note-action"
                                    onClick={() =>
                                        handleChangeOptions("labelOptions")
                                    }
                                >
                                    <span className="icon mui-icon icon-edit">
                                        {<Label />}
                                    </span>
                                </button>
                                {showLabelOptions && <LabelOptions note={note} />}
                            </div>
                            <button
                                className="btn btn-icon btn-note-action"
                                onClick={handleArchiveNote}
                            >
                                <span className="icon mui-icon icon-edit">
                                    {archiveIcon}
                                </span>
                            </button>
                            <button
                                className="btn btn-icon btn-note-action"
                                onClick={handleDeleteNote}
                            >
                                <span className="icon mui-icon icon-edit">
                                    {<Delete />}
                                </span>
                            </button>
                            <select
                                name="notePriority"
                                value={notePriority}
                                onChange={handleChangeNotePriority}
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
				    )
                }
			</div>
		</div>
	);
};

export { NoteItem };
