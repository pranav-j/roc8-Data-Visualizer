import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistor } from '../store'; // Import the persistor from your store

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`, 
                { email, password }, 
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.userDetails = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
