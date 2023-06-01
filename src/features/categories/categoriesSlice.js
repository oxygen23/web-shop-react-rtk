import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      console.log(state);
    });
  },
});

export default categoriesSlice.reducer;
