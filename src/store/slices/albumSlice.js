import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    albums: [],
    currentAlbum: null, 
    status: "idle",
    error: null,
}

export const fetchAlbum = createAsyncThunk("album/fetch", async( albumId, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/album/${albumId}`);
        console.log("response of fetch particular album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const fetchAllAlbum = createAsyncThunk("all_album/fetch", async( _, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/album/all`);
        console.log("response of fetch all album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message); 
    }
})

export const createAlbum = createAsyncThunk("album/create", async( albumData, {rejectWithValue} )=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/album/create`, albumData);
        console.log("response of create album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const deleteAlbum = createAsyncThunk("album/delete", async( albumId, {rejectWithValue} )=>{
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/album/delete/${albumId}`);
        console.log("response of delete album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const updateAlbum = createAsyncThunk("album/update", async( { albumId, albumUpdateData }, {rejectWithValue} )=>{
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/album/update/${albumId}`, albumUpdateData);
        console.log("response of delete album thunk", response);
        return {...response.data, updatedAlbumId: albumId};
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

const albumReducer = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        // fetch all albums
        .addCase(fetchAllAlbum.pending, (state)=>{
            state.status="loading";
        })
        .addCase(fetchAllAlbum.fulfilled, (state, action)=>{
            state.status = "success";
            state.albums = action.payload.albums;
        })
        .addCase(fetchAllAlbum.rejected, (state, action)=>{
            state.status = "error",
            state.error = action.payload
        })
        // fetch an album
        .addCase(fetchAlbum.pending, (state)=>{
            state.status="loading";
        })
        .addCase(fetchAlbum.fulfilled, (state, action)=>{
            state.status = "success";
            state.currentAlbum = action.payload.album;
        })
        .addCase(fetchAlbum.rejected, (state, action)=>{
            state.status = "error",
            state.error = action.payload
        })
        //create album
        .addCase(createAlbum.pending, (state)=>{
            state.status="loading";
        })
        .addCase(createAlbum.fulfilled, (state, action)=>{
            state.status = "success";
            state.albums.push(action.payload.album);
        })
        .addCase(createAlbum.rejected, (state, action)=>{
            state.status = "error",
            state.error = action.payload
        })
        //update album
        .addCase(updateAlbum.pending, (state)=>{
            state.status="loading";
        })
        .addCase(updateAlbum.fulfilled, (state, action)=>{
            state.status = "success";
            const updatedAlbumId = action.payload.updatedAlbumId;
            state.albums = state.albums.map((album)=> {
                if(album._id === updatedAlbumId){
                    const modifiedAlbum = action.payload.album
                    return modifiedAlbum
                }
                return album 
            })
        })
        .addCase(updateAlbum.rejected, (state, action)=>{
            state.status = "error",
            state.error = action.payload
        })
        // delete album
        .addCase(deleteAlbum.pending, (state)=>{
            state.status="loading";
        })
        .addCase(deleteAlbum.fulfilled, (state, action)=>{
            state.status = "success";
            state.albums = state.albums.filter((album)=> album._id !== action.payload.album._id);
        })
        .addCase(deleteAlbum.rejected, (state, action)=>{
            state.status = "error",
            state.error = action.payload
        })

    }
});

const { reducer } = albumReducer;
export default reducer;