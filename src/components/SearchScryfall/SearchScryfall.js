
import { Fragment, useContext, useEffect, useState } from "react";
import "./SearchScryfall.scss"
import Loading from "../Loading/Loading"
import Scryfall from "../../helpers/ScryfallApi"
import SearchResults from "../SearchResults/SearchResults";
import buildSearchQuery from "../../helpers/buildSeachQuery";


const SearchScryfall = ({updateCount, deckCards}) =>{

  const INIT_FORMDATA = {
    name:  ``,  nameExact:false,
    oracle:``,  oracleExact:false,
    flavor:``,  flavorExact:false,
    pow: `>=`,  powAmt: "",
    tou: `>=`,  touAmt: "",
    loy: `>=`,  loyAmt: "",
    cmc: `>=`,  cmcAmt: "",
    game: "paper",
}

  const [searchResData, setSearchResData] = useState({});

  // // Initialize state variables for form inputs
  const [formData, setFormData] = useState(INIT_FORMDATA);
  const [formErr, setFormErr] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) =>{
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  }


  const sendSearch = async (page = 1)=>{
    setLoadingResults(true);
    
    const qBuilt = buildSearchQuery(formData);
    const res = await Scryfall.search(qBuilt, page);

    setSearchResData(res);

    !res.data
      ? setFormErr([res.details])
      : res.warnings
        ? setFormErr(res.warnings)
        : setFormErr([]);
        
    setLoadingResults(false);
    scrollToSearch()
  }

  // Ensure user can find the results
  const scrollToSearch = ()=>{
    const element = document.getElementById('search-button');
    if (element) {  element.scrollIntoView({ behavior: 'smooth' }) }
  }

  // Handle Search submission
  const handleSearch = async (e) => {
      e.preventDefault();
      await sendSearch();
  }

  const comparisonOperators = ['<', '<=', '=', '>=', '>', '!='];

  return(
    <>
      <div className="search-wrapper">
        <h2>Search</h2>
        <div className="form-wrapper">
          <form className="Search-form" onSubmit={handleSearch}>

            <div className="form-group text-search">
              <label htmlFor="name">Name:</label>
              <input  placeholder={formData.name}
                type="text" id="name" name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label>
                <input  type="checkbox" id="nameExact" name="nameExact"
                  checked={formData.nameExact}
                  onChange={handleCheckboxChange}
                /> Exact
              </label>
            </div>
            
            <div className="form-group text-search">
              <label htmlFor="oracle">Oracle:</label>
              <input  placeholder={formData.oracle}
                  type="text" id="oracle" name="oracle"
                  value={formData.oracle}
                  onChange={handleInputChange}
              />
              <label>
                <input  type="checkbox" id="oracleExact" name="oracleExact"
                  checked={formData.oracleExact}
                  onChange={handleCheckboxChange}
                /> Exact
              </label>
            </div>
            
            <div className="form-group text-search">
              <label htmlFor="flavor">Flavor:</label>
              <input  placeholder={formData.flavor}
                  type="text" id="flavor" name="flavor"
                  value={formData.flavor}
                  onChange={handleInputChange}
              />
              <label>
                <input  type="checkbox" id="flavorExact" name="flavorExact"
                  checked={formData.flavorExact}
                  onChange={handleCheckboxChange}
                /> Exact
              </label>
            </div>

            <div className="form-group compare-int">
              <label htmlFor="pow">Power:</label>
              <select id="pow" name="pow"
                value={formData.pow}
                onChange={handleInputChange}
              >
                {comparisonOperators.map((o, idx) =>
                  <option key={idx} value={o}>{o}</option> )}
              </select>
              
              <label htmlFor="textInput" />
              <input  min={0} step={1} type="number" id="powAmt" name="powAmt"
                value={formData.powAmt}
                onChange={handleInputChange}/>
            </div>

            <div className="form-group compare-int">
              <label htmlFor="tou">Toughness:</label>
              <select id="tou" name="tou"
                value={formData.tou}
                onChange={handleInputChange}
              >
                {comparisonOperators.map((o, idx) =>
                  <option key={idx} value={o}>{o}</option> )}
              </select>
              
              <label htmlFor="textInput" />
              <input  min={0} step={1} type="number" id="touAmt" name="touAmt"
                value={formData.touAmt}
                onChange={handleInputChange}/>
            </div>

            <div className="form-group compare-int">
              <label htmlFor="loy">Loyalty:</label>
              <select id="loy" name="loy"
                value={formData.loy}
                onChange={handleInputChange}
              >
              {comparisonOperators.map((o, idx) =>
                <option key={idx} value={o}>{o}</option> )}
              </select>
              
              <label htmlFor="textInput" />
              <input  min={0} step={1} type="number" id="loyAmt" name="loyAmt"
                value={formData.loyAmt}
                onChange={handleInputChange}/>
            </div>

            <div className="form-group compare-int">
              <label htmlFor="cmc">Mana Cost:</label>
              <select id="cmc" name="cmc"
              value={formData.cmc}
              onChange={handleInputChange}
              >
                {comparisonOperators.map((o, idx) =>
                  <option key={idx} value={o}>{o}</option> )}
              </select>
              
              <label htmlFor="textInput" />
              <input  min={0} step={1} type="number" id="cmcAmt" name="cmcAmt"
                value={formData.cmcAmt}
                onChange={handleInputChange}/>
            </div>
            
            <div className="form-group">
              <label htmlFor="game">Game type:</label>
              <select id="game" name="game"
                value={formData.game}
                onChange={handleInputChange}
              >
                <option value="paper">Paper</option>
                <option value="arena">Arena</option>
                <option value="mtgo">MTGO</option>
              </select>
            </div>

            <ul>
              {formErr.length > 0 &&
                formErr.map((fErr, fIdx) =>
                  <li className="err-msg" key={fIdx}> {fErr} </li>
              )}
            </ul>
            <div>
              <button type="submit" id="search-button">Search</button>
            </div>
          </form>
        </div>
      </div>

      {loadingResults && <Loading />}
        {searchResData.data?.length > 0 &&
          <SearchResults
            allSearchData={searchResData}
            updateCount={updateCount}
            deckCards={deckCards}
            jumpToPage={sendSearch}
            isLoading={loadingResults}
          />
      }
    </>
  )
}

export default SearchScryfall;