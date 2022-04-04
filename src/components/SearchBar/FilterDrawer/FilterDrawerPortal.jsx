import ReactDOM from "react-dom";
import { FilterDrawer } from "./";

const FilterDrawerPortal = ({ handleChangeShowFilterModal }) => {
	return ReactDOM.createPortal(
		<FilterDrawer handleChangeShowFilterModal={handleChangeShowFilterModal} />,
		document.getElementById("portal")
	);
};

export { FilterDrawerPortal };
