import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getFilterValuesFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const filterValues = {};
    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=');
        if (['age', 'gender', 'startDate', 'endDate'].includes(key)) {
            filterValues[key] = decodeURIComponent(value);
        }
    });
    return filterValues;
};

const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
};

const clearFilterCookies = () => {
    ['age', 'gender', 'startDate', 'endDate'].forEach((filter) => {
        document.cookie = `${filter}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};

export const fetchFilteredData = createAsyncThunk(
    'data/fetchFilteredData',
    async ({ age, gender, startDate, endDate }) => {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/data`, {
            params: { age, gender, startDate, endDate },
            withCredentials: true,
        });
        return response.data;
    }
);

const initialFilterValues = getFilterValuesFromCookies();

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        selectedYValue: null,
        filters: {
            age: initialFilterValues.age || '',
            gender: initialFilterValues.gender || '',
            startDate: initialFilterValues.startDate || '',
            endDate: initialFilterValues.endDate || '',
        },
    },
    reducers: {
        setSelectedYValue: (state, action) => {
            state.selectedYValue = action.payload;
        },
        setFilterValues: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            // Store filter values in cookies
            Object.entries(action.payload).forEach(([key, value]) => {
                setCookie(key, value, 7); // Store cookie for 7 days
            });
        },
        clearFilterValues: (state) => {
            state.filters = {
                age: '',
                gender: '',
                startDate: '',
                endDate: '',
            };
            clearFilterCookies();
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

export const { setSelectedYValue, setFilterValues, clearFilterValues } = dataSlice.actions;

export default dataSlice.reducer;
