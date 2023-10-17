import { Routes, Route, Navigate} from 'react-router-dom';
import Home from "../Home/Home"
import Profile from "../Profile/Profile"
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

const RouteList = () =>{

    const {user} = useContext(UserContext)

    // useEffect(()=>{
    // async function getAllDecks(){
    // }
    // getAllDecks();
    // },[])

    console.log(`I AM USER`, user)

    return(
        <Routes>
            <Route
                path="/"
                element={ <Home /> }
            />
            
            {/* ONLY if user is logged in */}
            {user ? 
                <>
                <Route
                    path="/profile"
                    element={<Profile />}
                />
                </>
                : //If no user
                <>
                <Route
                    path="/login"
                    element={ <Login /> }
                />
                
                <Route
                    path="/signup"
                    element={ <SignUp /> }
                />
                    </>
            }
            {/* Catch all route */}
            <Route 
                path="*"
                element={ <Navigate to="/" replace={true} /> }
            />
        </Routes>
    )
}

export default RouteList;