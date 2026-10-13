import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        { ...checkoutdata },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response.data.message ||
          error.message ||
          "Something went Wrong please Try again later",
      });
    }
  },
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckout.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.loading = true;
      state.checkout = action.payload;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Create Checkout failed. Please try again."));
    });
  },
});

export default checkoutSlice.reducer;
