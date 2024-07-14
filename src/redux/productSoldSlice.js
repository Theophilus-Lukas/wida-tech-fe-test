import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postProductsSold = createAsyncThunk(
	"productsSold/postProductsSold",
	async (products) => {
		console.log("Payload being sent to the backend:", { products });
		const response = await axios.post(
			`http://127.0.0.1:8000/api/product-sold/create`,
			products
		);
		console.log("Response from the backend:", response.data);
		return response.data;
	}
);

const productsSoldSlice = createSlice({
	name: "productsSold",
	initialState: {
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postProductsSold.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postProductsSold.fulfilled, (state) => {
				state.status = "succeeded";
			})
			.addCase(postProductsSold.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default productsSoldSlice.reducer;
