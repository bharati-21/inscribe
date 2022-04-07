import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike"],
		["link", "image"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"link",
	"image",
];

const RichTextEditor = ({ noteBody, handleNoteBodyChange }) => {
	return (
		<ReactQuill
			modules={modules}
			formats={formats}
			value={noteBody}
			onChange={handleNoteBodyChange}
			placeholder="Enter Note Body"
		/>
	);
};

export { RichTextEditor };
