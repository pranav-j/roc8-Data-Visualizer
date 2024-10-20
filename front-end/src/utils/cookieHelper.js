import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie, clearCookie, getCookie } from '../../utils/cookieHelper';

export const fetchFilteredData = createAsyncThunk(
    'data/fetchFilteredData',
    async ({ age, gender, startDate, endDate }) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/data`, {
            params: { age, gender, startDate, endDate },
            withCredentials: true,
        });
        return response.data;
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        filters: {
            age: getCookie('filterAge') || '',
            gender: getCookie('filterGender') || '',
            startDate: getCookie('filterStartDate') || '',
            endDate: getCookie('filterEndDate') || '',
        },
    },
    reducers: {
        setFilterValues: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            // Store each filter value as a separate cookie
            setCookie('filterAge', state.filters.age, 7);
            setCookie('filterGender', state.filters.gender, 7);
            setCookie('filterStartDate', state.filters.startDate, 7);
            setCookie('filterEndDate', state.filters.endDate, 7);
        },
        clearFilterValues: (state) => {
            state.filters = {
                age: '',
                gender: '',
                startDate: '',
                endDate: '',
            };
            // Clear all filter cookies
            clearCookie('filterAge');
            clearCookie('filterGender');
            clearCookie('filterStartDate');
            clearCookie('filterEndDate');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilteredData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchFilteredData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setFilterValues, clearFilterValues } = dataSlice.actions;

export default dataSlice.reducer;
