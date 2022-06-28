import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { initialNotesState, notesReducerFunction } from "reducers/";
import { useAuth } from "./";
import {
	getArchivedNotesService,
	getNotesService,
	getTrashedNotesService,
} from "services/";
import { useToastify } from "custom-hook";
import { v4 as uuid } from "uuid";

const NotesContext = createContext(initialNotesState);
const { Provider } = NotesContext;

const NotesProvider = ({ children }) => {
	const { isAuth, authToken } = useAuth();
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
			const {
				data: { trash },
			} = await getTrashedNotesService(authToken);

			let labels = [
				{
					id: uuid(),
					label: "Journal",
				},
				{
					id: uuid(),
					label: "Personal",
				},
			];
			for (const note of notes) {
				const tags = note?.tags;
				if (tags?.length) {
					labels = [...labels, ...tags];
				}
			}

			notesDispatch({
				action: {
					type: "INIT_NOTES",
					payload: {
						notes,
						archives,
						notesStateLoading: false,
						notesStateError: null,
						showNewNoteForm: false,
						isEditing: null,
						editingNoteId: -1,
						labels,
						trash,
					},
				},
			});
		} catch (error) {
			notesDispatch({
				action: {
					type: "SET_NOTES_LOADER_ERROR",
					payload: {
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
			action: {
				type: "FILTER_BY_LABELS",
				payload: { filterByLabel: newFilterByLabels },
			},
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
				setShowSidebar,
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
