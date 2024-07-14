import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import InvoiceList from "./containers/InvoiceList";
import InvoiceForm from "./containers/InvoiceForm";
import Notification from "./containers/Notification";
import ProductsSoldForm from "./containers/ProductSoldForm";
import "./App.css";

function App() {
	const [notification, setNotification] = useState("");

	const showNotification = (message) => {
		setNotification(message);
		setTimeout(() => {
			setNotification("");
		}, 5000);
	};

	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					{notification && <Notification message={notification} />}
					<nav>
						<ul>
							<li>
								<Link to="/invoice/">Invoice List</Link>
							</li>
							<li>
								<Link to="/invoice/form">Invoice Form</Link>
							</li>
							<li>
								<Link to="/products-sold/form">Products Sold Form</Link>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route exact path="/invoice/" element={<InvoiceList />} />
						<Route
							path="/invoice/form"
							element={<InvoiceForm showNotification={showNotification} />}
						/>
						<Route
							path="/products-sold/form"
							element={<ProductsSoldForm showNotification={showNotification} />}
						/>
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
