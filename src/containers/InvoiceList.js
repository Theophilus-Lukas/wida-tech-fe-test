import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, setCurrentPage } from "../redux/invoicesSlice";

const InvoiceList = () => {
	const dispatch = useDispatch();
	const invoices = useSelector((state) => state.invoices.data);
	const currentPage = useSelector((state) => state.invoices.currentPage);
	const meta = useSelector((state) => state.invoices.meta);
	const status = useSelector((state) => state.invoices.status);
	const error = useSelector((state) => state.invoices.error);

	useEffect(() => {
		dispatch(fetchInvoices({ limit: 4, page: currentPage }));
	}, [dispatch, currentPage]);

	const handleNextPage = () => {
		if (meta.has_next) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};

	const handlePrevPage = () => {
		if (meta.has_prev) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};

	if (status === "loading") return <div>Loading...</div>;
	if (status === "failed") return <div>Error: {error}</div>;

	return (
		<div>
			<h1>Invoice List</h1>
			<div className="invoices-list">
				{invoices.map(
					(
						invoice // Access invoices.data here
					) => (
						<div key={invoice.invoice_no} className="invoice-item">
							<div>
								<strong>Invoice Number:</strong> {invoice.invoice_no}
							</div>
							<div>
								<strong>Date:</strong>{" "}
								{new Date(invoice.date).toLocaleDateString()}
							</div>
							<div>
								<strong>Customer:</strong> {invoice.customer}
							</div>
							<div>
								<strong>Sales Person:</strong> {invoice.sales_person}
							</div>
							<div>
								<strong>Payment Type:</strong> {invoice.payment_type}
							</div>
							<div>
								<strong>Notes:</strong> {invoice.notes}
							</div>
							<div>
								<strong>Total Paid:</strong> {invoice.total_paid}
							</div>
							<div className="products-sold">
								<h3>Products Sold:</h3>
								{invoice.product_sold.map((product, index) => (
									<div key={index} className="product-item">
										<div>
											<strong>Item:</strong> {product.item}
										</div>
										<div>
											<strong>Quantity:</strong> {product.quantity}
										</div>
										<div>
											<strong>Total COGS:</strong> {product.total_cogs}
										</div>
										<div>
											<strong>Total Price:</strong> {product.total_price}
										</div>
									</div>
								))}
							</div>
						</div>
					)
				)}
			</div>
			<div className="pagination">
				<button onClick={handlePrevPage} disabled={meta.has_prev === false}>
					Previous
				</button>
				<button onClick={handleNextPage} disabled={meta.has_next === false}>
					Next
				</button>
			</div>
		</div>
	);
};

export default InvoiceList;
