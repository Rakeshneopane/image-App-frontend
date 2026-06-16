import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

const initialState = {
    albumsData: [],
    currentAlbum: null, 
    albumStatus: "idle",
    albumError: null,
}

export const fetchAlbum = createAsyncThunk("album/fetch", async( albumId, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/album/${albumId}`);
        console.log("response of fetch particular album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const fetchAllAlbum = createAsyncThunk("all_album/fetch", async( _, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/album/all`);
        console.log("response of fetch all album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message); 
    }
})

export const createAlbum = createAsyncThunk("album/create", async( albumData, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.post(`/album/create`, albumData);
        console.log("response of create album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const deleteAlbum = createAsyncThunk("album/delete", async( albumId, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.delete(`/album/delete/${albumId}`);
        console.log("response of delete album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const updateAlbum = createAsyncThunk("album/update", async( { albumId, albumUpdateData }, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.patch(`/album/update/${albumId}`, albumUpdateData);
        console.log("response of delete album thunk", response);
        return {...response.data, updatedAlbumId: albumId};
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

const albumReducer = createSlice({
    name: "album",
    initialState,
    reducers: {
        clearAlbumStatus: (state) => {
            state.albumStatus = "idle";
            state.albumsData = [];
        }
    },
    extraReducers: (builder)=>{
        builder
        // fetch all albums
        .addCase(fetchAllAlbum.pending, (state)=>{
            state.albumStatus="loading";
        })
        .addCase(fetchAllAlbum.fulfilled, (state, action)=>{
            console.log("payload shape:", action.payload);
            state.albumStatus = "success";
            state.albumsData = action.payload.albums || (action.payload.album ? [action.payload.album] : []);
        })
        .addCase(fetchAllAlbum.rejected, (state, action)=>{
            state.albumStatus = "error";
            state.albumError = action.payload;
        })
        // fetch an album
        .addCase(fetchAlbum.pending, (state)=>{
            state.albumStatus="loading";
        })
        .addCase(fetchAlbum.fulfilled, (state, action)=>{
            state.albumStatus = "success";
            state.currentAlbum = action.payload.album;
        })
        .addCase(fetchAlbum.rejected, (state, action)=>{
            state.albumStatus = "error";
            state.albumError = action.payload;
        })
        //create album
        .addCase(createAlbum.pending, (state)=>{
            state.albumStatus="loading";
        })
        .addCase(createAlbum.fulfilled, (state, action)=>{
            state.albumStatus = "success";
            state.albumsData.push(action.payload.album);
        })
        .addCase(createAlbum.rejected, (state, action)=>{
            state.albumStatus = "error";
            state.albumError = action.payload;
        })
        //update album
        .addCase(updateAlbum.pending, (state)=>{
            state.albumStatus="loading";
        })
        .addCase(updateAlbum.fulfilled, (state, action)=>{
            state.albumStatus = "success";
            const updatedAlbumId = action.payload.updatedAlbumId;
            state.albumsData = state.albumsData.map((album)=> {
                if(album._id === updatedAlbumId){
                    const modifiedAlbum = action.payload.album;
                    return modifiedAlbum;
                }
                return album 
            })
        })
        .addCase(updateAlbum.rejected, (state, action)=>{
            state.albumStatus = "error";
            state.albumError = action.payload;
        })
        // delete album
        .addCase(deleteAlbum.pending, (state)=>{
            state.albumStatus="loading";
        })
        .addCase(deleteAlbum.fulfilled, (state, action)=>{
            state.albumStatus = "success";
            state.albumsData = state.albumsData.filter((album)=> album._id !== action.payload.album._id);
        })
        .addCase(deleteAlbum.rejected, (state, action)=>{
            state.albumStatus = "error";
            state.albumError = action.payload;
        })

    }
});


export const { clearAlbumStatus } = albumReducer.actions;

const { reducer } = albumReducer;
export default reducer;