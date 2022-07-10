import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,} from "react-router-dom";
import { Provider } from 'react-redux';
import './index.scss';
import 'macro-css';
import App from './App';
import {store} from "./store/store";


const rootElem = document.getElementById('root');

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
				<App />
				</Provider>
			</BrowserRouter>
		</React.StrictMode>,
	)
	;
}