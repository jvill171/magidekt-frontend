import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./Navbar.scss"
import { Link, NavLink } from "react-router-dom";

const Navbar = () =>{
    
    const { user, updateUser } = useContext(UserContext)
    
    const handleSignout = () =>{
        localStorage.removeItem(`_token`)
        updateUser();
    }

    return(
        <nav className="navbar-fade">
            <div className="navbar"> 
                <div className="logo">
                    <Link to="/"><span>Magi</span>dekt</Link>
                </div>
                <ul className="nav-NavLinks">
                    {user ?
                    <>
                        <li>
                            <NavLink to="/profile" >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/decks/${user}`} >
                                Decks
                            </NavLink>
                        </li>
                        <li>
                            <div className="signout" onClick={handleSignout}>
                                Signout
                            </div>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavLink to="/login" >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" >
                                Signup
                            </NavLink>
                        </li>
                    </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;