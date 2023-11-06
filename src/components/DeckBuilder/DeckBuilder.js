import { useEffect, useState } from "react";
import "./DeckBuilder.scss"
import Magidekt from "../../helpers/MagidektApi";
import Scryfall from "../../helpers/ScryfallApi";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import Mainboard from "../Mainboard/Mainboard";
import DeckInfo from "../DeckInfo/DeckInfo";
import SearchScryfall from "../SearchScryfall/SearchScryfall";
import { determineIdentity } from "../../helpers/toMana";
import DeleteForm from "../DeleteForm/DeleteForm";

const DeckBuilder = () =>{

    const {username, deckId} = useParams();
    const navigate = useNavigate()


    // Overlay is Open
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [deckInfoOpen, setDeckInfoOpen] = useState(false);
    const [deleteOpen  , setDeleteOpen  ] = useState(false);

    // Deck Data has loaded
    const [hasDeckLoaded, setHasDeckLoaded] = useState(false);
    const [showSavedMsg, setShowSavedMsg] = useState(false);

    const [searchNext, setSearchNext] = useState(undefined)
    
    const [deckCards, setDeckCards] = useState([])
    const [deckInfo, setDeckInfo] = useState()
    const [saveErrs, setSaveErrs] = useState([])

    function updateCardCount(targetID, amt, cardToAdd = null){
        const foundTarget = deckCards.filter(c => c.id === targetID)
        if(foundTarget[0] && !(foundTarget.magidekt?.qty === 0 && amt < 0 ) ){
            const updatedCards = deckCards.map(card =>
                card.id === targetID
                    ? { ...card, magidekt:{
                        qty: Math.max(card.magidekt.qty + amt),
                        action: Math.max(card.magidekt.qty + amt) <= 0
                                ? "remove"
                                : card.magidekt.action === "add"
                                    ? "add" : "update"
                    }}
                    : card
            );
            
            setDeckCards(updatedCards);
        }else if(cardToAdd && amt >= 0){
            cardToAdd.magidekt = { qty: 1, action: "add" };
            setDeckCards([...deckCards, cardToAdd]);
        }
    }

    const deleteDeck = async ()=>{
        const res = await Magidekt.deleteDeck(username, deckId)
        navigate(`/decks/${username}`) //After deletion, redirect to "/decks/:username"
    }

    const saveDeck = async (e)=>{
        e.preventDefault()
        const cardActions = {'none':[], 'add':[], 'update':[], 'remove':[]};
        // Pull cardId, action, and quantity from card
        const reducedData = deckCards.reduce((result, card)=>{
            const { id:cardId, magidekt:{ action, qty:quantity } } = card;
            action === "remove"
                ? result[action].push(cardId)
                : result[action].push({ cardId, quantity })

            return result;
        }, cardActions)

        const colorID = determineIdentity(deckCards);

        const saveDeckRes = await Magidekt.saveDeck(username, deckId, reducedData, colorID)
        if(saveDeckRes.message){
            setSaveErrs([...saveDeckRes.message]);
        }else{
            setSaveErrs([]);
            const processedCards = deckCards.map(card =>({
                ...card,
                magidekt:{ ...card.magidekt, action:"none" }
            }));
            setDeckCards(processedCards);
            setShowSavedMsg(true);
        }
    }


    useEffect(()=>{
        async function getDBCards(){
            const { cards, id, colorIdentity, deckName, description, format, tags
                } = await Magidekt.getDeckCards(username, deckId)
                
            setDeckInfo({ id, colorIdentity, deckName, description, format, tags})
            
            if(cards.length > 0){
                let resScryfall = await Scryfall.resolveUIDs(cards)
                // Append card count to each of Scryfall's replies
                const resolvedCards = resScryfall.data.map(card =>{
                    const foundCard = cards.find(c => c.cardId === card.id)
                    card.magidekt = {
                        qty: parseInt(foundCard.quantity),
                        action: "none"
                    }
                    return card;
                })
                setDeckCards(resolvedCards)
            }
            setHasDeckLoaded(true);
        }
        getDBCards();
    },[])
    
// Automatically close the "Saved!" message
  useEffect(() => {
    if(showSavedMsg){
        const timer = setTimeout(() => {
            setShowSavedMsg(false);
        }, 1000);
    
        return () => clearTimeout(timer);
    }
    
  }, [showSavedMsg]);

    return(
        <div className="DeckBuilder">
{/* EDIT DECK INFO BUTTON */}
            <button className="edit-info-btn" disabled={!deckInfo}
                onClick={ () => setDeckInfoOpen(true) }
            > Edit Deck Info </button>
{/* SEARCH BUTTON */}
            <button className="open-search-btn" disabled={!deckInfo}
                onClick={ () => setSearchIsOpen(true) }
            > Search Cards </button>
{/* SAVE BUTTON */}
            <button className="save-btn" disabled={!deckInfo}
                onClick={saveDeck}
            > Save </button>
            {saveErrs.length > 0 &&
                <div className="err-container">
                    <ul className="err-list">
                        {saveErrs.map((sErr, errIdx) => <li key={errIdx}>{sErr}</li> )}
                    </ul>
                </div>
            }
{/* DELETE BUTTON */}
            <button className="delete-btn" disabled={!deckInfo} onClick={() => setDeleteOpen(true) }
            > Delete </button>
            
            {showSavedMsg &&
                <h3 className="save-mgs">Saved!</h3>
            }

{/* Deck Info Overlay */}
            <Overlay isOpen={deckInfoOpen} onClose={ () => setDeckInfoOpen(false) }>
                <DeckInfo deckInfo={deckInfo} />
            </Overlay>
            
{/* Search Overlay */}
            <Overlay isOpen={searchIsOpen} onClose={ () => setSearchIsOpen(false)}
                containerWidth={"90vw"}
            >
                <SearchScryfall updateCount={updateCardCount} deckCards={deckCards}/>
            </Overlay>
{/* Delete Overlay */}
            <Overlay isOpen={deleteOpen} onClose={ () => setDeleteOpen(false)}
            >
                <DeleteForm toDelete="deck" deleteAction={deleteDeck}/>
            </Overlay>

            <Mainboard
                deckCards={deckCards}
                updateCount={updateCardCount}
                dataLoaded={hasDeckLoaded} />
        </div>
    )
}

export default DeckBuilder;

