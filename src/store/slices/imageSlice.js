import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    imagesData: [],
    currentImage: null, 
    favoriteImages: null,
    imageStatus: "idle",
    imageError: null,
}

export const uploadImages = createAsyncThunk("image/upload", async( imageData, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.patch(`/image/upload`, imageData);
        console.log("response of filtered images thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const fetchImage = createAsyncThunk("image/fetch", async( imageId, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/image/${imageId}`);
        console.log("response of fetch particular image thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const fetchAllImages = createAsyncThunk("all_image/fetch", async( albumId, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/image/${albumId}/images`);
        console.log("response of fetch all image thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message); 
    }
})

export const favoriteImages = createAsyncThunk("image/favorites", async( albumId, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.get(`/image/${albumId}/images/favorites`);
        console.log("response of create album thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const deleteImage = createAsyncThunk("image/delete", async( imageId, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.delete(`/image/delete/${imageId}`);
        console.log("response of delete image thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const filteredImages = createAsyncThunk("image/filtered", async( albumId, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.patch(`/image${albumId}/images/filter`, albumUpdateData);
        console.log("response of filtered images thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const toggleImages = createAsyncThunk("image/toggled", async( { imageId, imageData }, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.put(`/image${imageId}/toggle`, imageData);
        console.log("response of filtered images thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const commentImages = createAsyncThunk("image/commented", async( { imageId, comments }, {rejectWithValue} )=>{
    try {
        const response = await axiosInstance.patch(`/image${imageId}/comment`, comments);
        console.log("response of filtered images thunk", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})


const imageReducer = createSlice({
    name: "image",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        // upload Images
        .addCase(uploadImages.pending, (state)=>{
            state.status="loading";
        })
        .addCase(uploadImages.fulfilled, (state, action)=>{
            state.status = "success";
            state.images = action.payload.albums;
        })
        .addCase(uploadImages.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        // fetch all Images
        .addCase(fetchAllImages.pending, (state)=>{
            state.status="loading";
        })
        .addCase(fetchAllImages.fulfilled, (state, action)=>{
            state.status = "success";
            state.images = action.payload.albums;
        })
        .addCase(fetchAllImages.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        // fetch an image
        .addCase(fetchImage.pending, (state)=>{
            state.status="loading";
        })
        .addCase(fetchImage.fulfilled, (state, action)=>{
            state.status = "success";
            state.currentImage = action.payload.image;
        })
        .addCase(fetchImage.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        //get favorites images
        .addCase(favoriteImages.pending, (state)=>{
            state.status="loading";
        })
        .addCase(favoriteImages.fulfilled, (state, action)=>{
            state.status = "success";
            state.favoriteImages = action.payload.image;
        })
        .addCase(favoriteImages.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        //update album
        // .addCase(updateAlbum.pending, (state)=>{
        //     state.status="loading";
        // })
        // .addCase(updateAlbum.fulfilled, (state, action)=>{
        //     state.status = "success";
        //     const updatedAlbumId = action.payload.updatedAlbumId;
        //     state.albums = state.albums.map((album)=> {
        //         if(album._id === updatedAlbumId){
        //             const modifiedAlbum = action.payload.album
        //             return modifiedAlbum
        //         }
        //         return album 
        //     })
        // })
        // .addCase(updateAlbum.rejected, (state, action)=>{
        //     state.status = "error",
        //     state.error = action.payload
        // })
        //toggle image
        .addCase(toggleImages.pending, (state)=>{
            state.status="loading";
        })
        .addCase(toggleImages.fulfilled, (state, action)=>{
            state.status = "success";
            state.favoriteImages = state.images.map((image)=>
                {
                    if(image._id == action.payload.image._id){
                    return image.isFavorite = action.payload.image.isFavorite;
                }
            });
        })
        .addCase(toggleImages.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        //add comments in image
        .addCase(commentImages.pending, (state)=>{
            state.status="loading";
        })
        .addCase(commentImages.fulfilled, (state, action)=>{
            state.status = "success";
            state.images = state.images.map((image)=> {
                if(image._id == action.payload.image._id){
                    image.comments = action.payload.image.comments;
                }
                return image;
            });
        })
        .addCase(commentImages.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })
        // delete image
        .addCase(deleteImage.pending, (state)=>{
            state.status="loading";
        })
        .addCase(deleteImage.fulfilled, (state, action)=>{
            state.status = "success";
            state.images = state.images.filter((image)=> image._id !== action.payload.image._id);
        })
        .addCase(deleteImage.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.payload;
        })

    }
});

const { reducer } = imageReducer;
export default reducer;