import '../notes.css';
import { NoteItem } from "components";

const NotesList = ({ notes }) => {
    return (
        <article className="notes-container flex-col flex-align-center flex-justify-start mx-auto">
            {
                notes.map(note => <NoteItem key={note._id} note={note} />)
            }
        </article>
    )
}

export { NotesList };