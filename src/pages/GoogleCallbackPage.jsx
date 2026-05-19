import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const GoogleCallbackPage = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        // const params = new URLSearchParams(window.location.search);
        // const token = params.get("token");
        // if(!token) return navigate("/login");

        axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
            withCredentials: true,
        }).then((res)=>{
            console.log("User: ",res.data);
            navigate("/dashboard");
        }).catch((err)=>{
            console.log("Auth failed: ", err);
            navigate("/login");
        });
    },[]);

    return <p>Logging you in...</p>
}