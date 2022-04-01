import { toast } from "react-toastify";

const useToastify = () => {
	const showToast = (toastText="Operation Successfull", toastTheme="success") => {
		const notify = () => {
			toast[toastTheme](toastText, {
                theme:"colored",
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		};
		notify();
	};

	return { showToast };
};

export { useToastify };
