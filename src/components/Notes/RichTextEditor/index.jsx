import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike"],
		["link", "image"],
		["blockquote", "code-block"],
		[{ list: "ordered" }, { list: "bullet" }],
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
	"blockquote",
	"code-block",
	"list",
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
