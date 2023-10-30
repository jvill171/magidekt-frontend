import { useEffect, useState } from "react";
import "./DeckBuilder.scss"
import Magidekt from "../../helpers/MagidektApi";
import Scryfall from "../../helpers/ScryfallApi";
import { useParams } from "react-router-dom";
import IconMTG from "../IconMTG/IconMTG";
import SearchScryfall from "../SearchScryfall/SearchScryfall";
import Mainboard from "../Mainboard/Mainboard";

const DeckBuilder = () =>{

    const {username, deckId} = useParams();

    const [searchNext, setSearchNext] = useState(undefined)
    const [deckCards, setDeckCards] = useState([])
    

    function updateCardCount(targetID, newQTY){
        let updatedCards;
        // if(newQTY > 0){
        // }else{
        //     updatedCards = deckCards.filter(card => card.id !== targetID);
        //     // PENDING  - ADD CARD TO A "TO REMOVE" LIST - PENDING  - PENDING  - PENDING  - PENDING  - PENDING
        // }
        
        updatedCards = deckCards.map(card =>
            card.id === targetID
            ? { ...card, magidekt_qty: newQTY}
            : card
        );
        setDeckCards(updatedCards);
    }

    async function loadFromURL(){
        let res = await Scryfall.getByURL( searchNext );
        // WORK IN PROGRESS
    }
    async function cardSearch(){
        // let res = await Scryfall.search( query, 1 );
        // WORK IN PROGRESS
    }

    useEffect(()=>{
        async function getDBCards(){
            let res = await Magidekt.getDeckCards(username, deckId)

            if(res.cards.length > 0){
                let resScryfall = await Scryfall.resolveUIDs(res.cards)
    
                console.log(resScryfall)
                
                // Append card count to each of Scryfall's replies
                const resolvedCards = resScryfall.data.map(card =>{
                    const foundCard = res.cards.find(c => c.cardId === card.id)
                    card.magidekt_qty = foundCard.quantity;
                    return card;
                })
                setDeckCards(resolvedCards)
            }
        }
        getDBCards();
    },[username, deckId])

    return(
        <div className="DeckBuilder">
            <h1>DeckBuilder Component</h1>
            <div><p>DECK SETTINGS Overlay Component ?</p></div>
            <SearchScryfall  />
            <Mainboard deckCards={deckCards} updateCount={updateCardCount} />
        </div>
    )
}

export default DeckBuilder;

