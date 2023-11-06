
import "./SearchResults.scss"
import { stringMana } from "../../helpers/toMana";
import { Fragment, useEffect, useMemo, useState } from "react";


const SearchResults = ({allSearchData, isLoading, jumpToPage, updateCount, deckCards}) =>{
  
  const [allPages, setAllPages] = useState([]);
  const [currPage, setCurrPage] = useState(1)

  // Prevent value from going under 0
  const cardCountFloor = (current, card) =>{
    if(current){ updateCount(card.id, -1, card) }
  }

  const cardIdQty = useMemo(()=>{
    return deckCards.reduce((result, card)=>{
      result[card.id] = card.magidekt.qty;
      return result;
    },{})
  },[deckCards])

  useEffect(()=>{
    const maxPage = Math.ceil((allSearchData.total_cards / 175));
    const pageArr = Array.from({ length: maxPage }, (_, i) => i + 1);
    setAllPages(pageArr)
  },[allSearchData])

  async function handlePageNum(e){
    setCurrPage(e.target.value)
    jumpToPage(e.target.value)
  }

  return(
    <div  className="SearchResults"
          style={{ display: isLoading ? "none" : "inherit" }}>
      <table className="search-results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Oracle</th>
              <th title="Quantity">Qty</th>
            </tr>
          </thead>
          <tbody className="result-cards">
            {allSearchData.data.map((card, card_idx) => (
              <Fragment key={`card-${card_idx}`}>

              {!card.card_faces
/** Single-face cards */
                ? <tr className={`result-card`} 
                      style={(card_idx % 2) ? {backgroundColor:"#ccc"} : {}}
                  >
                    <td className="card-name">
                      <p>{card.name}</p>
                      <img src={card.image_uris.normal} alt={card.name} title={card.name} className="hover-image" />
                    </td>
                    <td>
                      {card.mana_cost ? stringMana(card.mana_cost) : "----"}
                    </td>
                    <td className="oracle-text">
                      {stringMana(card.oracle_text)}
                    </td>
                    <td>
                      <div className="button-container">
                        <button title="+1"
                          onClick={()=>updateCount(card.id, +1, card)}
                        >+</button>
                        <p>{cardIdQty[card.id] || 0}</p>
                        <button title="-1"
                          onClick={()=>cardCountFloor(cardIdQty[card.id], card)}
                        >-</button>
                      </div>
                    </td>
                  </tr>
/** Multi-face cards */
                : <>
                    {card.card_faces.map((face, face_idx) =>
                      <tr key={`face-${face_idx}`}
                          className={`result-card face-${face_idx}`}
                          style={(card_idx % 2) ? {backgroundColor:"#ccc"} : {}}
                      >
                        <td className="card-name">
                          <p>{face.name}</p>
                          <img src={(face.image_uris && face.image_uris.normal) || card.image_uris.normal} alt="Hover Image" className="hover-image" />
                        </td>
                        <td title={face.mana_cost || ""}>
                          {face.mana_cost ? stringMana(face.mana_cost) : "----"}
                        </td>
                        <td className="oracle-text">
                          {stringMana(face.oracle_text)}
                        </td>
                        {face_idx === 0 && (
                          <td rowSpan={2}>
                            <div className="button-container">
                              <button title="+1"
                                onClick={()=>updateCount(card.id, +1, card)}
                              >+</button>
                              <p>{cardIdQty[card.id] || 0}</p>
                              <button title="-1"
                                onClick={()=>cardCountFloor(cardIdQty[card.id], card)}
                              >-</button>
                            </div>
                          </td>
                        )}
                      </tr>
                    )}
                  </>
                }
              </Fragment>
            ))}
          </tbody>
        </table>
        <div className="page-control-container">
          {allPages.length > 0 &&
            <>
              <p>Page</p>
              <select
                id="currentPage"
                name="currentPage"
                value={currPage}
                onChange={handlePageNum}
                >
                {allPages.map((p, idx)=>
                  <option key={idx} value={p}>{p}</option>
                )}
              </select>
              <p>of {allPages.length}</p>
            </>
          }
        </div>
      </div>
    )
}

export default SearchResults;