import "./Home.scss"
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const Home = () =>{
    const {user} = useContext(UserContext)

    return(
        <div className="Home">
            { user
                ? <div>
                    <h2>Welcome {user}</h2>
                    <p>To view your created decks, navigate to <NavLink to={`/decks/${user}`} style={{fontWeight:"bold"}}>Decks</NavLink> on the top right</p>
                  </div>
                : <>
                    <h1>Magidekt</h1>
                    <div className="auth-buttons">
                        <NavLink to="/login" >
                            <button>Login</button>
                        </NavLink>
                        <NavLink to="/signup" >
                            <button>Sign Up</button>
                        </NavLink>
                    </div>
                  </>
            }
            

        </div>
    )
}

export default Home;