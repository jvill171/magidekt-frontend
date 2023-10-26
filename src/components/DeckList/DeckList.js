import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import MagidektApi from "../../helpers/MagidektApi";

import "./DeckList.scss"
import DeckListItem from "../DeckListItem/DeckListItem";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";

const DeckList = () =>{

    const [userDecks, setUserDecks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(UserContext)
    
    useEffect(()=>{
        async function getUserDecks(){
            const decksRes = await MagidektApi.getUserDecks(user);
            setUserDecks([...decksRes])
        }
        getUserDecks();
        setIsLoading(false)
    }, [user])

    return(
        <div className="DeckList">
            <h1>{user}'s Decks</h1>
            {isLoading 
                ?
                <>
                    <br/>
                    <Loading showText={true} breakCount={2}/>
                </>
                :
                <>
                    <NavLink to={`/decks/${user}/new`} >
                        <button>New Deck</button>
                    </NavLink>
                    
                    <div className="deck-list">
                        {userDecks
                            ? userDecks.map(d=>
                                <DeckListItem key={`deck-${d.id}`}
                                              className="deck-item"
                                              data={d}
                                              showOwner={false}/>)
                            : <h3>No decks found!</h3>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default DeckList;