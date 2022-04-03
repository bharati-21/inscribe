import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { initialNotesState, notesReducerFunction } from "reducers/";
import { useAuth } from "./";
import { getNotesService } from "services/";
import { useToastify } from "custom-hook/useToastify";

const NotesContext = createContext(initialNotesState);
const { Provider } = NotesContext;

const NotesProvider = ({ children }) => {
	const { isAuth } = useAuth();

    const { showToast } = useToastify();

	const fetchNotes = async (authToken) => {
		try {
			const {
				data: { notes },
			} = await getNotesService(authToken);
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
		} catch (error) {
			notesDispatch({
				action: {
					type: "SET_NOTES_ERROR",
					payload: {
                        showNewNoteForm: false,
                        isEditing: null,
                        editingNoteId: -1,
						notesLoading: false,
						notesError: "Couldn't load notes. Try again later.",
					},
				},
			});
            showToast('Failed to load notes. Try again later.', 'error')
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

	const [showSidebar, setShowSidebar] = useState(false);

	const handleShowSidebar = () =>
		setShowSidebar((prevShowSidebar) => !prevShowSidebar);

	return (
		<Provider
			value={{
				...notesState,
				showSidebar,
				handleShowSidebar,
				notesDispatch,
			}}
		>
			{children}
		</Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
