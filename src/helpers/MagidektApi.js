import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class Magidekt {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    // Pull the token from the localstorage
    const token = localStorage.getItem(`_token`)

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      // Uncomment line below for more detailed debug
      // console.debug(`MAKING API CALL\n`, method, url, `\ndata:`, data, `\nparams:`, params, `\nheaders:`, headers)
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      let status = err.response.status;
      throw Array.isArray(message) ? { message, status } : { message:[message], status };
    }
  }

  // Individual API routes
  
  /** updateUserData
   * Returns response:    token
   */
  static async signUp(data){
    try{
      let res = await this.request(`auth/register`, data, "post")
      return res.token;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**login
   * Returns response:    token
   */
  static async login(data){
    try{
      let res = await this.request(`auth/token`, data, "post")
      return res.token
    }catch(err){
      console.error(err)
      return err;
    }
  }


  /**getUserData
   * Retreive a specific user's data
   * 
   * Returns response:
   *    {username, displayName, email, isAdmin, deckCount }
   */
  static async getUserData(username){
    try{
      let res = await this.request(`users/${username}`);
      return res.user;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**updateUserData
   * Update a user's username, password, and/or email
   * 
   * Returns response:
   *    {username, displayName, email, isAdmin}
   */
  static async updateUserData(username, formData){

    const { displayName, email, password } = formData;

    const data = {
      displayName: displayName.trim(), // Remove leading/trailing blankspace
      email,
      ...(password && {password}) // Ignore empty/blank password
    }

    try{
      let res = await this.request(`users/${username}`, data, "patch")
      return res.user;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**getUserDecks
   * Retreive all decks for a specified user
   * 
   * Returns response:
   *    { id, deckName, description, format, colorIdentity, tags, displayName}
   */
  static async getUserDecks(username){
    try{
      let res = await this.request(`users/${username}/decks`);
      return res.deckCollection;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**getDeckFormats
   * Retreive all valid deck formats
   * 
   * Returns an array of valid deck formats as:
   *    ["format1", "format2", etc...]
   */
  static async getDeckFormats(){
    try{
      let res = await this.request(`decks/deck_formats`);
      return res.deckFormats;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**createDeck()
   * 
   * Creates a new deck without any cards
   * 
   * Returns { id, deckName, description, format, colorIdentity, tags, deckOwner}
   */
  static async createDeck(username, data){
    try{
      let res = await this.request(`users/${username}/decks`, data, `post`);
      return res.deck;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**updateDeck()
   * 
   * Updates deck info
   * 
   *  data can include:{deckName, description, format
   *                    colorIdentity, tags[] }
   * Returns 
   *  { colorIdentity, deckName, deckOwner,
   *    description, format, id, tags }
   */
  static async updateDeck(username, deckId, data){
    try{
      const {id, ...newData} = data;

      let res = await this.request(`users/${username}/decks/${deckId}`, newData, "patch");
      console.log(`RES DEC`, res.deck )
      return res.deck;
    }catch(err){
      console.error(err);
      return err;
    }
  }

  /**createDeck()
   * 
   * Creates a new deck without any cards
   * 
   * Returns {id, deckName, description, format, colorIdentity, tags, cards}
   */
  static async getDeckCards(username, deckId){
    try{
      let res = await this.request(`users/${username}/decks/${deckId}`);
      return res.deck
    }catch(err){
      console.error(err)
      return err;
    }
  }

}

export default Magidekt;



