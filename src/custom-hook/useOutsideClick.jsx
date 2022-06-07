import React, { useEffect } from "react";

const useOutsideClick = (reference, handler) => {
	const handleOutsideClick = (event) => {
		if (!reference.current) return;
		if (
			reference.current &&
			(event.target === reference.current ||
				reference.current.contains(event.target))
		) {
			return;
		}
		if (handler) handler();
	};
	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []);
};

export { useOutsideClick };
