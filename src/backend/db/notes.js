import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 **/

export const notes = [
	{
		_id: uuid(),
		isArchived: false,
		noteBackgroundColor: "var(--bg-card-color)",
		noteBody:
			"<ul><li>The Alchemist</li><li>Flowers for Algernon</li><li>The Little Prince</li></ul>",
		noteCreatedOn: formatDate(),
		notePriority: "None",
		noteTitle: "Books I want to read",
		tags: [
			{
				id: uuid(),
				label: "Books",
			},
		],
	},
	{
		_id: uuid(),
		isArchived: false,
		noteBackgroundColor: "var(--bg-card-color)",
		noteBody:
			'<ol><li><a href="https://developer.mozilla.org/en-US/docs/Web/Performance" rel="noopener noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Performance</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" rel="noopener noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility" rel="noopener noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Accessibility</a></li></ol>',
		noteCreatedOn: formatDate(),
		notePriority: "None",
		noteTitle: "Web app performance",
		tags: [
			{
				id: "42d5d0f5-1741-42e4-8d52-f3c1c2e97902",
				label: "Web development",
			},
		],
	},
];
