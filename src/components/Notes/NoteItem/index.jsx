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
    Label
} from "@mui/icons-material";

import { ColorPalette, LabelOptions } from "components/";
import { deleteNoteService, postArchiveService, postUnarchiveService, deleteArchivedNoteService } from "services";
import { useAuth, useNotes } from "contexts";
import { useToastify } from "custom-hook/useToastify";

const NoteItem = ({ note }) => {

    const { _id, noteTitle, noteBody, noteCreatedOn, isArchived, tags } = note;

    const initialShowOptions = {
        showColorPalette: false,
        showLabelOptions: false,
    }

	const [showOptions, setShowOptions] = useState({
		showColorPalette: false,
        showLabelOptions: false,
	});

	const [pinned, setPinned] = useState(false);

	const { showColorPalette, showLabelOptions } = showOptions;

	const { authToken } = useAuth();
	const { notesDispatch } = useNotes();

	const { showToast } = useToastify();

	const handleChangeOptions = (option) => {
		switch (option) {   
			case "colorPalette":
                setShowOptions(prevShowOptions => ({...initialShowOptions, showColorPalette: !prevShowOptions.showColorPalette}));
                break;
            case 'labelOptions':
                setShowOptions(prevShowOptions => ({...initialShowOptions, showLabelOptions: !prevShowOptions.showLabelOptions}));
                break;
		}
	};

    const handleDeleteArchivedNote = async () => {
        try {
			const { data: { archives } } = await deleteArchivedNoteService(_id, authToken);
			notesDispatch({
				action: {
					type: "EDIT_ARCHIVES",
					payload: {
						archives,
						showNewNote: false,
                        isEditing: null,
                        editingNoteId: -1
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
    }

	const handleDeleteNote = async () => {
        if(isArchived) return handleDeleteArchivedNote();
		try {
			const { data } = await deleteNoteService(_id, authToken);
			notesDispatch({
				action: {
					type: "SET_NOTES",
					payload: {
						notes: data.notes,
						showNewNote: false,
                        isEditing: null,
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
					isEditing: isArchived ? 'archive' : 'note',
					editingNoteId: _id,
				},
			},
		});
	};

    const handleArchiveNote = async () => {
        try {
            const  { data: { notes, archives } } = isArchived ? await postUnarchiveService(note, authToken) : await postArchiveService(note, authToken);

            showToast(isArchived ? 'Note unarchived' : 'Note archived', 'success');
            notesDispatch({
				action: {
					type: "SET_ARCHIVES",
					payload: {
						notes,
						archives
					},
				},
			});
        }
        catch(error) {
            showToast(isArchived ? 'Note could not be unarchived. Try again later' : 'Note could not be archived. Try again later', 'error');
        }
    }

	const pinIcon = pinned ? <PushPin /> : <PushPinOutlined />;
    const archiveIcon = isArchived ? <Unarchive /> : <Archive />
    const mappedTags = tags.length > 0 && <div className="notes-tag-list flex-row flex-align-center flex-justify-start flex-wrap">
        {
            tags.map(({ label, id }) => 
                <span className="badge badge-primary py-0-25 px-0-5 text-sm" key={id}>
                    {label}
                </span> 
            )
        }
    </div>

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
            { mappedTags }
			<div className="note-info flex-row flex-align-center flex-justify-between flex-wrap">
				<div className="note-timestamp text-sm gray-color">
					{noteCreatedOn}
				</div>
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
							onClick={() => handleChangeOptions("colorPalette")}
						>
							<span className="icon mui-icon icon-edit">
								{<Palette />}
							</span>
						</button>
						{showColorPalette && <ColorPalette />}
					</div>
                    <div className="note-action-wrapper">
						<button
							className="btn btn-icon btn-note-action" onClick={() => handleChangeOptions("labelOptions")}
						>
							<span className="icon mui-icon icon-edit">
								{<Label />}
							</span>
						</button>
                        {showLabelOptions && <LabelOptions note={note} />}
					</div>
					<button className="btn btn-icon btn-note-action" onClick={handleArchiveNote}>
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
				</div>
			</div>
		</div>
	);
};

export { NoteItem };
