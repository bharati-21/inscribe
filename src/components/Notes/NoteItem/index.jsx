const { useState } = require("react");
import TextareaAutosize from "react-textarea-autosize";
import {
	PushPinOutlined,
	PushPin,
	Edit,
	Archive,
	Delete,
	Palette,
} from "@mui/icons-material";

import { ColorPalette } from "components/ColorPalette";
import { deleteNoteService } from "services";
import { useAuth, useNotes } from "contexts";
import { useToastify } from "custom-hook/useToastify";

const NoteItem = ({ note: { _id, noteTitle, noteBody, noteCreatedOn } }) => {
	const [showOptions, setShowOptions] = useState({
		showColorPalette: false,
	});

	const [pinned, setPinned] = useState(false);

	const { showColorPalette } = showOptions;

	const { authToken } = useAuth();
	const { notesDispatch } = useNotes();

	const { showToast } = useToastify();

	const handleChangeOptions = (option) => {
		switch (option) {
			case "colorPalette":
				setShowOptions((prevShowOptions) => ({
					...prevShowOptions,
					showColorPalette: !prevShowOptions.showColorPalette,
				}));
				break;
		}
	};

	const handleDeleteNote = async () => {
		try {
			const { data } = await deleteNoteService(_id, authToken);
			notesDispatch({
				action: {
					type: "SET_NOTES_SUCCESS",
					payload: {
						notes: data.notes,
						notesError: null,
						notesLoading: false,
						showNewNote: false,
                        isEditing: false,
                        editingNoteId: -1
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
					isEditing: true,
					editingNoteId: _id,
				},
			},
		});
	};

	const pinIcon = pinned ? <PushPin /> : <PushPinOutlined />;

	return (
		<div
			className={`note note-card p-1 flex-col flex-align-start flex-justify-between`}
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
			<div className="note-info flex-row flex-align-center flex-justify-between">
				<div className="note-timestamp text-sm gray-color">
					Created on {noteCreatedOn}
				</div>
				<div className="note-actions flex-row flex-justify-center flex-align-center">
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
							onClick={() => handleChangeOptions("colorPalette")}
						>
							<span className="icon mui-icon icon-edit">
								{<Palette />}
							</span>
						</button>
						{showColorPalette && <ColorPalette />}
					</div>
					<button className="btn btn-icon btn-note-action">
						<span className="icon mui-icon icon-edit">
							{<Archive />}
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
				</div>
			</div>
		</div>
	);
};

export { NoteItem };
