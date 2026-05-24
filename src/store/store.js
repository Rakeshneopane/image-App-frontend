import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./slices/albumSlice.js";
import imageReducer from "./slices/imageSlice.js";
import userReducer from "./slices/authSlice.js";

export const store = configureStore({
    reducer: {
        albumSlice: albumReducer,
        imageSlice: imageReducer,
        userSlice: userReducer,
    }
})