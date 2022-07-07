import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,} from "react-router-dom";

import './index.scss';
import 'macro-css';

import App from './App';


const rootElem = document.getElementById('root');

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				
				<App />
				
			</BrowserRouter>
		</React.StrictMode>,
	)
	;
}