import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import "./DeckListItem.scss"
import { identityToMana } from "../../helpers/toMana";
import makeTitleCase from "../../helpers/makeTitleCase";
import IconMTG from "../IconMTG/IconMTG";

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
    const upFormat = makeTitleCase(format);
    // Generate mana icons
    const colorIcons = identityToMana(colorIdentity)

    return(
        <NavLink to={`/decks/${user}/${id}`} className="DeckListItem decklist-item">

            <h3 className="deck-name">{deckName}</h3>
            <p className="deck-identity">
                {cardCount > 0 
                    ? colorIcons
                    : <IconMTG manaData={"C"} spaced={false}/>}
            </p>
            <ul>
                {showOwner &&
                    <li>
                        <b>Owner:</b> {deckOwner}
                    </li>
                }
                <li className={`id`}>
                    <b>Deck ID:</b> {id}
                </li>
                <li className={`cards`}>
                    <b>Cards:</b> {cardCount}
                </li>
                <li className={`format`}>
                    <b>Format:</b> {upFormat}
                </li>
                <li className={`tags`}>
                    <b>Tags:</b> {tags && tags.length > 0
                        ? tags.join(', ')
                        : ''}
                </li>
                <li className={`description`}>
                    <b>Description:</b> 
                        <p>{description}</p>
                </li>
            </ul>
        </NavLink>
    )
}

export default DeckListItem;