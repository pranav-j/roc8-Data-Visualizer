import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import dataReducer from "./slices/dataSlice.js";
import userReducer from "./slices/userSlice.js";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    dataReducer,
    userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
