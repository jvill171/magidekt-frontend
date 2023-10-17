import { useEffect } from "react";
import Magidekt from "../../helpers/MagidektApi";
import "./Home.scss"
import { NavLink } from "react-router-dom";


const Home = () =>{

    return(
        <div className="Home">
            <h1>Magidekt</h1>
            <div className="auth-buttons">
                <NavLink to="/login" >
                    <button>Login</button>
                </NavLink>
                <NavLink to="/signup" >
                    <button>Sign Up</button>
                </NavLink>
            </div>

        </div>
    )
}

export default Home;