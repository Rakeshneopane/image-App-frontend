import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/slices/authSlice.js";

export const GoogleCallbackPage = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

     const {userData : user, userStatus} = useSelector((state)=> {
        console.log("state from callback: ", state);
        return state.userSlice});

    //fetching when component mounts
    // useEffect(() => {
    //     if(userStatus === "idle")
    //         dispatch(fetchUser());        
    // }, [userStatus, dispatch]);

    console.log("user from callback: ",user)
   
    useEffect(()=>{
        if(userStatus === "loading" || userStatus === "idle") {
            console.log("Still loading, waiting...");
            return;
        }
        if(user){
            console.log("navigating with user:", user, "status:", userStatus);
            return navigate("/dashboard");
        }
        return navigate("/login", {replace: true})
    },[user, userStatus]);

    return <p>Logging you in... status = {userStatus} </p>
}