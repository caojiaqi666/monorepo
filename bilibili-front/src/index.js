/*
 * @Author: anjiang
 * @Date: 2023-01-17
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-17
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/home/index";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();
