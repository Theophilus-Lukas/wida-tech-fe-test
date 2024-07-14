import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProductsSold } from "../redux/productSoldSlice";

const ProductsSoldForm = ({ showNotification }) => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({
		invoice_no: "",
		item: "",
		quantity: "",
		total_cogs: "",
		total_price: "",
	});
	const [products, setProducts] = useState([]);

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const addProduct = () => {
		setProducts([...products, product]);
		setProduct({
			invoice_no: "",
			item: "",
			quantity: "",
			total_cogs: "",
			total_price: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("Submitting products:", products); // Debug statement
			await dispatch(postProductsSold(products));
			showNotification("Products sold successfully added!");
			setProducts([]);
		} catch (error) {
			console.error("Failed to add products sold:", error);
		}
	};

	return (
		<div className="products-sold-form">
			<h2>Add Products Sold</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Invoice Number:</label>
					<input
						type="number"
						name="invoice_no"
						value={product.invoice_no}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Item:</label>
					<input
						type="text"
						name="item"
						value={product.item}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Quantity:</label>
					<input
						type="number"
						name="quantity"
						value={product.quantity}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Total COGS:</label>
					<input
						type="number"
						name="total_cogs"
						value={product.total_cogs}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Total Price:</label>
					<input
						type="number"
						name="total_price"
						value={product.total_price}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="button" onClick={addProduct}>
					Add Product
				</button>
				<button type="submit">Submit</button>
			</form>
			<div className="products-list">
				<h3>Products to be added:</h3>
				<ul>
					{products.map((prod, index) => (
						<li key={index}>
							{prod.invoice_no} - {prod.item} - {prod.quantity} -{" "}
							{prod.total_cogs} - {prod.total_price}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProductsSoldForm;
