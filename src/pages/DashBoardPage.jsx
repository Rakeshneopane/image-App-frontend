import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllAlbum } from "../store/slices/albumSlice.js";

import AlbumSection from "../components/albums/AlbumSection.jsx"
import { useDispatch, useSelector } from "react-redux";

import UploadModal from "@/components/modals/uploadModal.jsx";

export const DashBoardPage = () => {

    console.log("DashboardPage rendered"); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData : user, userStatus, userError } = useSelector((state)=> {
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
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-300 to-gray-100 w-full">
            {user ? (
                <div className="p-4 flex-shrink-0">
                    <h1 className="font-bold text-xl tracking-tight text-foreground">
                        Welcome Back, {user.name.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Here's what's happening with your photos
                    </p>
                </div>
            ) : (
                <p>Loading... user is gone</p>
            )}

            <div className="flex-1 min-h-0">
                <AlbumSection />
            </div>
            <UploadModal />
        </div>
    );
};
