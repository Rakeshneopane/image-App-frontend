// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AlbumCard from "../components/albums/AlbumCard"

export const DashboardPage = () => {

    console.log("DashboardPage rendered"); // 
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [album, setAlbums] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
            withCredentials: true,
        })
        .then((res) => { 
            console.log(res.data);
            setUser(res.data.user);
            setLoading(false);
        })
        .catch(() => navigate("/login"));

    }, []);

    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_BASE_URL}/album/all`, {
    //         withCredentials: true,
    //     })
    //     .then((res) => setAlbums(res.data.user))
    //     .catch(() => navigate("/login"));
    // }, []);
    if (loading) return <p>Loading...</p>;
    
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

            {/* {album ? (
                <>
                    <h1>Welcome, {album.name}</h1>
                    <p>{album.description}</p>
                    <p>owner: {user._id === album.owner._id ? user : "no match"} </p>
                </>
            ) : (
                <p>Loading...</p>
            )} */}
        </div>
    );
};