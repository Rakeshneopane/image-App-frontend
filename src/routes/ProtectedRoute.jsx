import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchUser} from "../store/slices/authSlice.js"

export const ProtectedRoute = ({ children ,requiredRole = null})=>{

    const { userData : user, userStatus, userError } = useSelector((state)=> {
        console.log("state: ",state);
        return state.userSlice});

    const dispatch = useDispatch();

    useEffect(() => {
        if(userStatus === "idle") {
            dispatch(fetchUser());
        }
    }, []);

    console.log( userStatus, userError, user );
    if(userStatus === "loading" || userStatus === "idle"){
        return( <div> Loading... from protected route compo </div>)
    }
    

    if(!user){
        return <Navigate to="/login" replace={true} />;
    }

    if(user.role !== requiredRole && requiredRole){
        return <Navigate to="/unauthorized" replace={true} />;
    }

    return children;
}