import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart frpm local storage

const localCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to store cart data
const storeCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// get cart data
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
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

// Add product To Cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, size, color, quantity, userId, guestId },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, size, color, quantity, userId, guestId },
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
// Update product In Cart

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updatequantity",
  async (
    { productId, size, color, quantity, userId, guestId },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, size, color, quantity, userId, guestId },
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

// Remove product From Cart

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, size, color, userId, guestId },
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

// Merge User cart and guest Cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ user, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        data: { user, guestId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

const cardSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      ((state.cart = { products: [] }), localStorage.removeItem("cart"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      storeCartToStorage(action.payload);
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Failed Fetching Cart. Please try again.";
    });

    // Add to Cart
    builder.addCase(addToCart.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      storeCartToStorage(action.payload);
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Add to Cart failed. Please try again.";
    });
    //  Update Cart
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      storeCartToStorage(action.payload);
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Update Cart failed. Please try again.";
    });

    // remove cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      storeCartToStorage(action.payload);
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Remove failed. Please try again.";
    });

    // merge cart
    builder.addCase(mergeCart.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(mergeCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      storeCartToStorage(action.payload);
    });
    builder.addCase(mergeCart.rejected, (state,action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Merge Cart  failed. Please try again.";
    });
  },
});

export const { clearCart } = cardSlice.actions;

export default cardSlice.reducer;
