import React, { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import RouteList from "../RouteList/RouteList";

const UserProvider = () =>{

    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const updateUser = () => {
      try{
        const token = localStorage.getItem(`_token`)
        const { username } = jwtDecode(token)
        setUser(username)
      }catch(err){
        // Authentication to routes that require authentication will be handled by backend
        setUser(undefined) // Bad/no token = Invalid user; Logged out
        navigate("/") //After logout, redirect to "/"
      }
    };
    
    useEffect(()=>{
      if(!user){
        updateUser()
      }
      setIsLoading(false)
    },[user])

    return(
        <UserContext.Provider value={{ user, updateUser }}>
        {isLoading ?
          <>
            <h1>Loading...</h1>
            <Loading />
          </>
          :
          <>
            <Navbar />
            <RouteList />
          </>
        }
        </UserContext.Provider>
    )
}

export default UserProvider;