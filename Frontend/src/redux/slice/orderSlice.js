import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-order`,
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

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchorderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      ((state.loading = false), (state.orders = action.payload));
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Fetch Order failed. Please try again."));
    });
    // Fetch OPrder By Id
    builder.addCase(fetchOrderDetails.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
      ((state.loading = false), (state.orderDetails = action.payload));
    });
    builder.addCase(fetchOrderDetails.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Fetch One Order Failed. Please try again."));
    });
  },
});

export default orderSlice.reducer;
