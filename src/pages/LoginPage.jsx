import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const apiFetch = async(url, options = {}) =>{
//     const response = await axios.post(url, {...options});

//     if(response.status === 401){
//         throw new Error("Unauthorised");
//     }

//     const contentType = response.headers["content-type"];
//     if(!contentType || !contentType.includes("application/json")){
//         console.error("Recieved non-JSON reponse: ", await response.text());
//         throw new Error("Server did not return JSON. Check your API URL.");
//     }

//     if(!response.status === ok){
//         const errorData = await response.json();
//         console.log("Error response: ", errorData);
//         throw new Error(errorData.error || errorData.message || "API error");
//     }

//     return await response.json();
// }

export const LoginPage = () =>{
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    // });
    // const navigate = useNavigate();
    // const handleLogin = async(next) =>{

    //     const { username, password } = formData;
    //     try {
    //         const response = await apiFetch(`${BASE_URL}/auth/google`, {
    //             headers : { "Content-Type": "application/json" },
    //             credentials: "include",
    //         });

    //         console.log(response);

    //         localStorage.setItem("authToken", response.token);
    //         localStorage.setItem("user", JSON.stringify(response.user));

    //         return navigate("/")

    //     } catch (error) {
    //         next(error)            
    //     }
    // };

    // const handleForgotPassword = () =>{};

    // const handleRegister = () =>{};

    // const handleFormdata = (e)=>{
    //     const {name, value} = e.target;
    //     setFormData((prev)=>({
    //         ...prev,
    //         [name]: value,
    //     }));
    // }

    const handleGoogleLogin = (e) =>{
        e.preventDefault();
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
    }

    return (
        <>
        {/* <form action="" onSubmit={handleLogin}>
            <input 
                type="text" 
                placeholder="username"
                name="username"
                value={formData.username} 
                onChange={(e)=>handleFormdata(e)}
            />
            <input 
                type="text" 
                placeholder="password" 
                name="password"
                value={formData.password}
                onChange={(e)=>handleFormdata(e)}
            />
            <button 
                type="button" 
                onClick={handleForgotPassword}
            >Forgot password?</button>

            <button >Login</button>

            <label 
                htmlFor="register"
            >Don't Have an account?</label>
            
            <button 
                type="button" 
                onClick={handleRegister} 
                name="register"
            >Register</button>
        </form> */}

        <button type="button" onClick={(e)=>handleGoogleLogin(e)}> 
            Login with Google
             </button>
        </>
    )

}