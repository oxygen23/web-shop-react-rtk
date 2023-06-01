import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });

      return login.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  currentUser: null,
  cart: [],
  favourites: [],
  formType: 'signup',
  showForm: false,
};

const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });

      state.cart = newCart;
    },

    removeItemFromCart: (state, { payload }) => {
      console.log(payload)
      console.log(state.cart)
      
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    addItemToFavourite: (state, { payload }) => {
      state.favourites.push(payload);
    },

    deleteItemFromFavourites: (state, { payload }) => {
      const index = state.favourites.findIndex(
        (item) => item.id === payload
      );
      state.favourites.splice(index, 1);
    },

    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategories.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
    // builder.addCase(getCategories.rejected, (state) => {
    //   state.isLoading = false;
    //   console.log(state);
    // });
  },
});

export const {
  addItemToCart,
  addItemToFavourite,
  toggleForm,
  toggleFormType,
  deleteItemFromFavourites,
  removeItemFromCart,
} = userSlice.actions;

export default userSlice.reducer;
