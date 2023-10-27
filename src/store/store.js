import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./api";
import authReducer from "..features/auth/authSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,

        // NOTE: auth key here should match name of authslice
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
});

export default store;