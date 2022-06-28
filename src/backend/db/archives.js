import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 **/

export const archives = [
	{
		_id: uuid(),
		createdOn: "",
		isArchived: true,
		noteBackgroundColor: "var(--bg-card-color)",
		noteBody:
			'<p><a href="https://unsplash.com/s/photos/seealpsee%2C-schwende-district%2C-switzerland" rel="noopener noreferrer" target="_blank">Seealpsee, Schwende District, Switzerland</a></p><p><img src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"></p><p><br></p>',
		noteCreatedOn: formatDate(),
		notePriority: "Low",
		noteTitle: "Beautiful places to visit",
		tags: [],
	},
];
