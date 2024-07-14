import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInvoices = createAsyncThunk(
	"invoices/fetchInvoices",
	async ({ limit, page }) => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/invoice/?limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			throw Error("Failed to fetch invoices");
		}
	}
);

export const postInvoice = createAsyncThunk(
	"invoices/postInvoice",
	async (newInvoice) => {
		const response = await axios.post(
			`http://127.0.0.1:8000/api/invoice/create`,
			newInvoice
		);
		return response.data;
	}
);

const invoicesSlice = createSlice({
	name: "invoices",
	initialState: {
		currentPage: 1,
		meta: false,
		data: [],
		status: "idle",
		error: null,
	},
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInvoices.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchInvoices.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.data;
				state.meta = action.payload.meta;
			})
			.addCase(fetchInvoices.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(postInvoice.fulfilled, (state, action) => {
				state.data.push(action.payload);
			});
	},
});

export const { setCurrentPage } = invoicesSlice.actions;

export default invoicesSlice.reducer;
