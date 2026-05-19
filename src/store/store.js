import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./slices/albumSlice";

export const store = configureStore({
    reducer: {
        album: albumReducer
    }
})