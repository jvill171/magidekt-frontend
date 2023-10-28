import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import "./DeckListItem.scss"
import { identityToMana } from "../../helpers/toMana";

const DeckListItem = ({data, showOwner = true}) =>{
    const { user } = useContext(UserContext)

    const { colorIdentity,
            deckName,
            description,
            displayName:deckOwner,
            format,
            id,
            tags,
            cardCount } = data;

    // Capitalize first letter
    const upFormat = format[0].toUpperCase() + format.slice(1);
    // Generate mana icons
    const colorIcons = identityToMana(colorIdentity)

    return(
        <NavLink to={`/decks/${user}/${id}`} className="DeckListItem decklist-item">

            <p>{`/decks/${user}/${id}`}</p>

            <h3 className="deck-name">{deckName}</h3>
            <p className="deck-identity">
                {cardCount > 0 
                    ? colorIcons
                    : <span className="ms no-mana"></span>}
            </p>
            <ul>
                {showOwner &&
                    <li>
                        <b>Owner:</b> {deckOwner}
                    </li>
                }
                <li>
                    <b>Deck ID:</b> {id}
                </li>
                <li>
                    <b>Cards:</b> {cardCount}
                </li>
                <li>
                    <b>Format:</b> {upFormat}
                </li>
                <li>
                    <b>Tags:</b> {tags && tags.length > 0
                        ? tags.join(', ')
                        : ''}
                </li>
                {description && 
                    <li>
                        <b>Desc:</b> {description}
                    </li>
                }
            </ul>
        </NavLink>
    )
}

export default DeckListItem;