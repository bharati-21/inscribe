import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom";

const Portal = () => {
    return ReactDOM.createPortal(
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />,
        document.getElementById("portal")
    );
}

export default Portal;