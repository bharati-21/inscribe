import NotFoundImage from 'assets/images/not_found.svg';
import { Link } from 'react-router-dom';
import "./not-found.css";

const NotFound = () => {
    return (
        <section className="section-wrapper flex-col flex-align-center flex-justify-start not-found-main px-2">
            <h1>Page Not Found!</h1>
			<button className="btn btn-primary px-1 py-0-25 text-lg">
				<Link to="/">Go Back Home</Link>
			</button>
        </section>
    )
}

export { NotFound };