import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postInvoice } from "../redux/invoicesSlice";

const InvoiceForm = ({ showNotification }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		invoice_no: "",
		date: "",
		customer: "",
		sales_person: "",
		payment_type: "",
		notes: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(postInvoice(formData));
			showNotification("Invoice successfully created!");
			setFormData({
				invoice_no: "",
				date: "",
				customer: "",
				sales_person: "",
				payment_type: "",
				notes: "",
			});
		} catch (error) {
			console.error("Failed to create invoice:", error);
		}
	};

	return (
		<div className="invoice-form">
			<h2>Create New Invoice</h2>
			<form onSubmit={handleSubmit} className="invoice-form">
				<div className="form-group">
					<label>Invoice Number:</label>
					<input
						type="number"
						name="invoice_no"
						value={formData.invoice_no}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Date:</label>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Customer:</label>
					<input
						type="text"
						name="customer"
						value={formData.customer}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Sales Person:</label>
					<input
						type="text"
						name="sales_person"
						value={formData.sales_person}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Payment Type:</label>
					<input
						type="text"
						name="payment_type"
						value={formData.payment_type}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Notes:</label>
					<textarea
						name="notes"
						value={formData.notes}
						onChange={handleChange}
						rows={4}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default InvoiceForm;
