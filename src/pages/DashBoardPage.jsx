// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { fetchAllAlbum } from "../store/slices/albumSlice.js";

import AlbumCard from "../components/albums/AlbumCard"
import { useDispatch, useSelector } from "react-redux";

export const DashboardPage = () => {

    console.log("DashboardPage rendered"); // 
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData : user, userStatus, userError } = useSelector((state)=> {
        console.log("state: ",state , "user: ", state.userSlice);
        return state.userSlice
    });

    console.log("user: ", user);

    useEffect(()=>{
        if(user)
        dispatch(fetchAllAlbum());
    },[user]);

    useEffect(()=>{
        if (userStatus === "error") {
        navigate("/login");
    }
    },[navigate, userStatus]);

    const { albumsData: albums, albumStatus, albumError } = useSelector((state)=>state.albumSlice);
    console.log("albums: ", albums);

    if (userStatus === "loading") return <p>Loading...</p>;
    
    return (
        <div>
            {user ? (
                <>
                    <h1 className="bg-blue-500">Welcome, {user.name}</h1>
                    <p>{user.email}</p>
                    <AlbumCard />
                </>
            ) : (
                <p>Loading... user is gone</p>
            )}

            {albums ? ( albums?.map((album)=>(
                <div key={album._id}>
                    <h1>Welcome, {album.name}</h1>
                    <p>{album.description}</p>
                    <p>owner: {user._id === album.owner._id ? user : "no match"} </p>
                </div>
            ))
                
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};