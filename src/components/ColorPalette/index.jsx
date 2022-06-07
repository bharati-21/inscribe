import { useOutsideClick } from "custom-hook";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import "./color-palette.css";

const ColorPalette = ({
	handleChangeNoteBackgroundColor,
	noteBackgroundColor,
	setShowOptions,
}) => {
	const colors = [
		{
			id: uuid(),
			value: "#ffffff",
		},
		{
			id: uuid(),
			value: "#fcd2c5",
		},
		{
			id: uuid(),
			value: "#fbbc04",
		},
		{
			id: uuid(),
			value: "#fff475",
		},
		{
			id: uuid(),
			value: "#ccff90",
		},
		{
			id: uuid(),
			value: "#a7ffeb",
		},
		{
			id: uuid(),
			value: "#cbf0f8",
		},
		{
			id: uuid(),
			value: "#aecbfa",
		},
		{
			id: uuid(),
			value: "#d7aefb",
		},
		{
			id: uuid(),
			value: "#fdcfe8",
		},
		{
			id: uuid(),
			value: "#e6c9a8",
		},
	];

	const colorPaletteRef = useRef(null);
	useOutsideClick(colorPaletteRef, () => {
		setShowOptions((prevShowOptions) => ({
			...prevShowOptions,
			showColorPalette: false,
		}));
	});

	const colorMapping = colors.map(({ id, value }) => (
		<button
			key={id}
			className={`color-sphere color-${value} btn btn-icon ${
				noteBackgroundColor === value
					? "color-sphere  selected-color"
					: "color-sphere"
			}`}
			style={{ backgroundColor: value }}
			value={value}
			name="noteBackgroundColor"
			onClick={handleChangeNoteBackgroundColor}
		></button>
	));

	return (
		<div
			className="option-wrapper flex-row flex-wrap flex-align-center flex-justify-center"
			ref={colorPaletteRef}
		>
			{colorMapping}
		</div>
	);
};

export { ColorPalette };
