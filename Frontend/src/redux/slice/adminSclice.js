import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All User Details

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/api/users`,
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

// Create users

export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/api/users`,
        userData,
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

// update User
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({id, ...userData}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/api/users/${id}`,
        userData,
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
// delete User
export const removeUser = createAsyncThunk(
  "admin/removeUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to fetch users data";
    });

    // add user

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload.user);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to fetch users data";
    });

    // update user

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action?.payload?.user ?? {};
      const index = state.users.findIndex(
        (item) => item._id === updatedUser?._id ?? "",
      );
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      state.error = null;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to fetch users data";
    });

    // Delete user

    builder.addCase(removeUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((item) => item._id !== id);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        action.error.message ||
        "Failed to fetch users data";
    });
  },
});

export default adminSlice.reducer;
