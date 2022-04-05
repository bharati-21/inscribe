import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { initialNotesState, notesReducerFunction } from "reducers/";
import { useAuth } from "./";
import { getArchivedNotesService, getNotesService } from "services/";
import { useToastify } from "custom-hook/useToastify";

const NotesContext = createContext(initialNotesState);
const { Provider } = NotesContext;

const NotesProvider = ({ children }) => {
	const { isAuth } = useAuth();
	const { showToast } = useToastify();
	const [searchText, setSearchText] = useState("");

	const fetchNotes = async (authToken) => {
		try {
			const {
				data: { notes },
			} = await getNotesService(authToken);
			const {
				data: { archives },
			} = await getArchivedNotesService(authToken);

			notesDispatch({
				action: {
					type: "INIT_NOTES_STATE_SUCCESS",
					payload: {
						notes,
						archives,
						notesStateLoading: false,
						notesStateError: null,
						showNewNoteForm: false,
						isEditing: null,
						editingNoteId: -1,
						labels: [],
					},
				},
			});
		} catch (error) {
			notesDispatch({
				action: {
					type: "INIT_NOTES_STATE_ERROR",
					payload: {
						showNewNoteForm: false,
						isEditing: null,
						editingNoteId: -1,
						notesStateLoading: false,
						notesStateError:
							"Couldn't retrieve notes. Try again later.",
					},
				},
			});
			showToast("Failed to load notes. Try again later.", "error");
		}
	};

	useEffect(() => {
		const authToken = localStorage.getItem("inscribe-token");
		if (authToken || isAuth) {
			fetchNotes(authToken);
		}
	}, [isAuth]);

	const [notesState, notesDispatch] = useReducer(
		notesReducerFunction,
		initialNotesState
	);

	useEffect(() => {
		const newFilterByLabels = notesState.labels.map(({ label, id }) => {
			const foundLabel = notesState.filterByLabel.find(
				(filter) => filter.id === id
			);
			return foundLabel ? foundLabel : { id, label, filtered: false };
		});

		notesDispatch({
			action: { type: "FILTER_BY_LABELS", payload: { filterByLabel: newFilterByLabels } }
		});
	}, [notesState.labels]);

	const [showSidebar, setShowSidebar] = useState(false);

	const handleShowSidebar = () =>
		setShowSidebar((prevShowSidebar) => !prevShowSidebar);

	const handleChangeSearchText = (event) => setSearchText(event.target.value);

	return (
		<Provider
			value={{
				...notesState,
				showSidebar,
				handleShowSidebar,
				notesDispatch,
				searchText,
				handleChangeSearchText,
			}}
		>
			{children}
		</Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
