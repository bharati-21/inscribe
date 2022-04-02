import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotesProvider } from "contexts/";
import Portal from './Portal.js'
// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<NotesProvider>
                    <Portal />
					<App />
				</NotesProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
