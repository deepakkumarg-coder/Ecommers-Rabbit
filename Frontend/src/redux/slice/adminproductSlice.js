import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Global Constant

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/admin/api/products`;


// Async Thunk to get All Products

export const fertchAdminProducts = createAsyncThunk(
  "adminproduct/fetchproduct",
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

// Async Thunk to get create Products

export const createAdminProducts = createAsyncThunk(
  "adminproduct/createproduct",
  async (productData, { rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
      const response = await axios.post(API_URL, productData, {
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

// Async Thunk to get Update Products

export const updateAdminProducts = createAsyncThunk(
  "adminproduct/updateproduct",
  async ({id = "", productData}, { rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
      const response = await axios.put(`${API_URL}/${id}`, productData, {
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

// Async Thunk to get Delete Product

export const removeAdminProduct = createAsyncThunk(
  "adminproduct/removeproduct",
  async (id = "", { rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
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
// Async Thunk to get Delete Product Image

export const removeAdminProductImage = createAsyncThunk(
  "adminproduct/removeproductimage",
  async ({id,imageUrl}, { rejectWithValue }) => {
    try {
      const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
      const response = await axios.delete(`${API_URL}/${id}/image`, {
        data:{imageUrl},
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

const adminProductSlice = createSlice({
  name: "adminproducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    // Fetch all products

    builder.addCase(fertchAdminProducts.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(fertchAdminProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fertchAdminProducts.rejected, (state,action) => {
      state.loading = false;
      state.error =
        action?.payload?.message ||
        action?.error?.message ||
        "Failed to fetch Products data";
    });

    // Add Products

    builder.addCase(createAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createAdminProducts.fulfilled, (state, action) => {
      state.loading=false
      state.error = null;
    });
    builder.addCase(createAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to Create Product data";
    });

    // update user

    builder.addCase(updateAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAdminProducts.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === updatedProduct._id,
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
      state.loading=false
      state.error = null;
    });
    builder.addCase(updateAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action?.payload?.message ||
        action?.error?.message ||
        "Failed to Update product data";
    });

    // Delete Product

    builder.addCase(removeAdminProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeAdminProduct.fulfilled, (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((item) => item._id !== id);
      state.loading =false;
      state.error = null;
    });
    builder.addCase(removeAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to Remove Products Data";
    });
    // Delete Product Image

    builder.addCase(removeAdminProductImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeAdminProductImage.fulfilled, (state, action) => {
      state.loading =false;
      state.error = null;
    });
    builder.addCase(removeAdminProductImage.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to Remove Products Data";
    });
  },
});

export default adminProductSlice.reducer