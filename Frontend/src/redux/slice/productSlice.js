import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async function to get Products By filter
export const fetchProductsByFilter = createAsyncThunk(
  "products/fetchByFilters",
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    },
    { rejectWithValue },
  ) => {
    try {
      const query = new URLSearchParams();
      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product?${query.toString()}`,
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

//Async function to get product by id

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/single/${id}`,
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
//Async function to get product by id

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (id = "", productData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
        productData,
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
//Async function to get similar by id

export const fetchSimilarProduct = createAsyncThunk(
  "product/fetchSimilarProduct",
  async (id = "") => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/similar/${id}`,
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    selectedProducts: null,
    similarProduct: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByFilter.pending, (state) => {
      ((state.loading = true), (state.error = null));
    });
    builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {  
      state.product = Array.isArray(action.payload) ? action.payload : [];
      ((state.loading = false), (state.error = null));
    });
    builder.addCase(fetchProductsByFilter.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Filter Products failed. Please try again."));
    });
    // Handle fetching Single Product By id
    builder.addCase(fetchProductDetails.pending, (state) => {
      ((state.loading = true), (state.error = false));
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.selectedProducts  = action.payload;
      ((state.loading = false), (state.error = false));
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Fetching Prodect Details failed. Please try again."));
    });
    // update Product

    builder.addCase(updateProduct.pending, (state) => {
      ((state.loading = true), (state.error = false));
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updateProduct = action.payload;
      const index = state.product.findIndex(
        (product) => product._id === updateProduct._id,
      );
      if (index !== -1) {
        state.product[index] = updateProduct;
      }
      ((state.loading = false), (state.error = false));
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Update Product failed. Please try again."));
    });

    // Handle Similar Product
    builder.addCase(fetchSimilarProduct.pending, (state) => {
      ((state.loading = true), (state.error = false));
    });
    builder.addCase(fetchSimilarProduct.fulfilled, (state, action) => {
      state.similarProduct = action.payload;
      ((state.loading = false), (state.error = false));
    });
    builder.addCase(fetchSimilarProduct.rejected, (state, action) => {
      ((state.loading = false),
        (state.error =
          action.payload?.message ||
          action.error?.message ||
          "Fetching Data failed. Please try again."));
    });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;

export default productSlice.reducer;
