
import { useEffect, useState } from "react"
import DeckCategoryCards from "../DeckCategoryCards/DeckCategoryCards"
import "./Mainboard.scss"


const Mainboard = ({deckCards, updateCount}) =>{

    const [cardCategorys, setCardCategories] = useState([])
    const allCats = [
      "Planeswalker","Token","Creature","Land","Artifact",
      "Enchantment","Sorcery","Instant","Scheme", "Other" ]

    function determineCategory(card){
      let cTypeLine = (card.type_line || card.card_faces[0].type_line).toLowerCase();

      for(let i = 0; i< allCats.length; i++){
        if(cTypeLine.includes(allCats[i].toLowerCase())){
          return allCats[i].charAt(0).toUpperCase() + allCats[i].slice(1);
        }
      }
      return "Other";
    }

    function filterByCategory(category){
      return deckCards.filter(card => determineCategory(card) === category)
    }

    // Set cards into their categories
    useEffect(()=>{
      const uniqueTypes = new Set();
        deckCards.forEach( card => {
          const foundType = determineCategory(card);
          uniqueTypes.add(foundType);
      })
      
      const catOrder = [
        "Land", "Creature", "Artifact", "Planeswalker", "Enchantment",
        "Sorcery", "Instant", "Token","Scheme", "Other" ]

      const orderedUnique = catOrder.filter(category => uniqueTypes.has(category))
      setCardCategories( orderedUnique )
    },[deckCards])

    return(
      <div className="card-category-container">

        {deckCards && cardCategorys.map((categ, catIdx) =>
          <div style={{zIndex: catIdx}} key={`category-${categ}`} className="card-category">
            
            <div className="title-category">
              {categ !== "Other" && <i className={`ms ms-${categ.toLowerCase()} title-icon`}></i>}
                <p className="title-text">{categ}</p>
            </div>
            <ul className="card-list">

              {filterByCategory(categ).map((c, idx) => (
                <>
                  {c.magidekt_qty > 0 && 
                    <li key={`card-${idx}-${c.id}`} className="card">
                      <DeckCategoryCards
                        cardData={c}
                        updateCount={updateCount}
                        />
                    </li>}
                </>
              ))}

            </ul>
          </div>
        )}

      </div>
    )
}

export default Mainboard;