import "./Navbar.scss"
import { Link, NavLink } from "react-router-dom";

const Navbar = () =>{

    return(
        <nav className="navbar">
            <div className="logo">
                <Link to="/"><span>Magi</span>dekt</Link>
            </div>
            <ul className="nav-NavLinks">
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
            </ul>
        </nav>
    )
}

export default Navbar;