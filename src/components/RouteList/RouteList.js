import { Routes, Route, Navigate} from 'react-router-dom';
import Home from "../Home/Home"
import Profile from "../Profile/Profile"
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import DeckBuilder from "../DeckBuilder/DeckBuilder";
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import DeckList from '../DeckList/DeckList';
import NewDeck from '../NewDeck/NewDeck';

const RouteList = () =>{
    const {user} = useContext(UserContext)
    
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
                    <Route exact
                        path="/decks/:username"
                        element={<DeckList />}
                    />
                    <Route exact
                        path="/decks/:username/new"
                        element={<NewDeck />}
                    />
                    <Route exact
                        path="/decks/:username/:deckId"
                        element={<DeckBuilder />}
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