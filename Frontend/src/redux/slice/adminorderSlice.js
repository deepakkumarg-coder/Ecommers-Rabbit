import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Global Constant

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/admin/api/orders`;


// To get All orders

export const fetchAllOrder = createAsyncThunk(
  "adminorder/fetchOrder",
  async (_,{ rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });
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

// Async Thunk to get Update Order

export const updateAdminOrder = createAsyncThunk(
  "adminorder/updateorder",
  async ({ id = "", status }, { rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
      const response = await axios.put(
        `${API_URL}/${id}`,
        { status },
        {
          headers: {
            Authorization: USER_TOKEN,
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

// Async Thunk to get Delete Order

export const removeAdminOrder = createAsyncThunk(
  "adminorder/removeorder",
  async (id = "", { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });
      return id;
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

const adminorderSlice = createSlice({
  name: "adminorder",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all orders

    builder.addCase(fetchAllOrder.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.totalOrders = action.payload.length;
      const totalSales = action.payload.reduce(
        (acc, item) => acc + item.totalPrice,
        0,
      );
      state.totalSales = totalSales;
      state.loading = false;
    });
    builder.addCase(fetchAllOrder.rejected, (state,action) => {
      state.loading = false;
      state.error =
        action?.payload?.message ||
        action?.error.message ||
        "Failed to fetch Orders data";
    });

    // update Order

    builder.addCase(updateAdminOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateAdminOrder.fulfilled, (state, action) => {
      const updateadminOrder = action.payload;
      const index = state.orders.findIndex(
        (item) => item._id === updateadminOrder._id,
      );
      if (index !== -1) {
        state.orders[index] = updateadminOrder;
      }
      state.error = false;
    });
    builder.addCase(updateAdminOrder.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to Update product data";
    });

    // Delete user

    builder.addCase(removeAdminOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeAdminOrder.fulfilled, (state, action) => {
      const id = action.payload;

      const deletedOrder = state.orders.find((item) => item._id === id);

      if (deletedOrder) {
        state.totalSales -= deletedOrder.totalPrice;
      }

      state.orders = state.orders.filter((item) => item._id !== id);

      state.totalOrders = state.orders.length;
      state.error = null;
    });
    builder.addCase(removeAdminOrder.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to Remove Products Data";
    });
  },
});


export default adminorderSlice.reducer