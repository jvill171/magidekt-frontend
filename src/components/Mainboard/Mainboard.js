
import { Fragment, useEffect, useState } from "react"
import DeckCategoryCards from "../DeckCategoryCards/DeckCategoryCards"
import "./Mainboard.scss"
import makeTitleCase from "../../helpers/makeTitleCase"
import Loading from "../Loading/Loading";

const Mainboard = ({deckCards, updateCount, dataLoaded}) =>{

  const INIT_CATEGORIES = {
    Planeswalker: [], Token: [], Creature: [], Land: [], Artifact: [],
    Enchantment: [], Sorcery: [], Instant: [], Scheme: [], Other: [],
  }

  const [cardCats, setCardCats] = useState(INIT_CATEGORIES)
  
  const allCats = [ "Planeswalker","Token","Creature","Land","Artifact", "Enchantment","Sorcery","Instant","Scheme", "Other" ]
  const catOrder = [ "Land", "Creature", "Artifact", "Planeswalker", "Enchantment", "Sorcery", "Instant", "Token","Scheme", "Other" ]
  
  function categorizeData(data, allCategories) {
    return data.reduce((result, card) => {
      if(card.magidekt.qty > 0){
        const category = determineCategory(card);
        allCategories[category].push(card);
      }
      return result;
    }, allCategories);
  }

  function determineCategory(card){
    const cTypeLine = (card.type_line || card.card_faces[0].type_line).toLowerCase();

    for(let i = 0; i< allCats.length; i++){
      if(cTypeLine.includes(allCats[i].toLowerCase())){
        return makeTitleCase(allCats[i]);
      }
    }
    return "Other";
  }

  useEffect(()=>{
    if(dataLoaded){
      const sortedData = categorizeData(deckCards, INIT_CATEGORIES)
      setCardCats(sortedData)
    }
  },[deckCards, dataLoaded])

  return(
    <>
      { !dataLoaded
        ? <Loading showText={true} breakCount={2}/>
        : <div className="card-category-container">
            {deckCards && catOrder.map((categ, catIdx) =>
              cardCats[categ].length > 0 && (
                <div style={{zIndex: catIdx}}  className="card-category" key={`category-${categ}`}>
                  
                  <div className="title-category">
                    {categ !== "Other" &&
                      <i className={`ms ms-${categ.toLowerCase()} title-icon`}></i>
                    }
                      <p className="title-text">{categ}</p>
                  </div>
                  <ul className="card-list">
                    {cardCats[categ].map(c =>(
                      // c.magidekt.qty > 0 &&
                      (
                        <li key={`card-${c.id}`} className="card">
                          <DeckCategoryCards cardData={c} updateCount={updateCount}/>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
      }
    </>
  )
}

export default Mainboard;

