/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItem", async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}

	// .then((res) => res.json())
	// .catch((err) => console.log(err));
});

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const ItemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== ItemId);
		},
		increaseItem: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},
		decreaseItem: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotal: (state) => {
			let amount = 0;
			let total = 0;

			state.cartItems.forEach((item) => {
				amount += item.amount;
				total = amount * item.price;
			});
			state.amount = amount;
			state.total = total;
		},

		extraReducers: {
			[getCartItems.pending]: (state) => {
				state.isLoading = true;
			},
			[getCartItems.fulfilled]: (state, action) => {
				state.state.isLoading = false;
				state.cartItems = action.payload;
			},
			[getCartItems.rejected]: (state) => {
				state.isLoading = false;
			},
		},
	},
});

export const {
	clearCart,
	removeItem,
	increaseItem,
	decreaseItem,
	calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
