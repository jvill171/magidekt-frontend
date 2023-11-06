
import "./DeckCategoryCards.scss"
import { useState } from "react";


const DeckCategoryCards = ({cardData, updateCount}) =>{

    const [flipState, setFlipState] = useState(false);
    function toggleFlip(){  setFlipState(!flipState) }

    return(
        <>
            <p className="card-qty">{cardData.magidekt.qty}</p>
            <div className="card-actions">
                <button
                    className="card-add"
                    title="+1"
                    onClick={()=>updateCount(cardData.id, 1)}>
                    {`+`}
                </button>
                <button
                    className="card-remove"
                    title="-1"
                    onClick={()=>updateCount(cardData.id, -1)}>
                    {`-`}
                </button>
                {!cardData.image_uris && 
                    <button className="card-flip" title="Flip" onClick={toggleFlip}>
                        <i className="ms ms-untap"></i>
                    </button>
                }
            </div>
            {cardData.image_uris
                ? <img className="card-image" src={cardData.image_uris.normal} alt={cardData.name} title={cardData.name}/>
                : <>{!flipState
                        ? <img className="card-image card-front" src={cardData.card_faces[0].image_uris.normal} alt={cardData.card_faces[0].name} title={cardData.card_faces[0].name}/>
                        : <img className="card-image card-back"  src={cardData.card_faces[1].image_uris.normal} alt={cardData.card_faces[1].name} title={cardData.card_faces[1].name}/>
                    }
                </>
            }
        </>
    )
}

export default DeckCategoryCards;