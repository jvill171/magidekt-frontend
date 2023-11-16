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
    // Prevent password update for demo user
    if(username === "demouser"){
      delete formData.password
    }

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

  /**deleteUser()
   * 
   * Deletes [username]
   * 
   * Returns { deleted: username }
   */
  static async deleteUser(username){
    // Prevent demouser deletion
    if(username === "demouser"){ return; }

    try{
      let res = await this.request(`users/${username}`, {}, `delete`);
      return res;
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

  /**deleteDeck()
   * 
   * Deletes [username]'s deck with id of [id]
   * 
   * Returns { deleted: id }
   */
  static async deleteDeck(username, deckId){
    try{
      let res = await this.request(`users/${username}/decks/${deckId}`, {}, `delete`);
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
  
  /**addDeckCards
   * Adds cards to a specified user deck.
   * 
   * @param username - user attempting to make the change
   * @param deckId - ID of the target deck
   * @param data  - An object like { deckCards:[ { cardId, quantity }, ...] }
   * @returns { added:[{ cardId, quantity }, ...], rejected:[{ cardId, quantity }, ...] }
   */
  static async addDeckCards(username, deckId, data){
    try{
        let res = await this.request(`users/${username}/decks/${deckId}/cards`, data, "post");
        return res.cards;

      }catch(err){
        console.error(err)
        return err;
      }
  }
  
  /**updateDeckCards
   * Updates cards from a specified user deck.
   * 
   * @param username - user attempting to make the change
   * @param deckId - ID of the target deck
   * @param data  - An object like { deckCards:[ { cardId, quantity }, ...] }
   * @returns { updated:[{ cardId, quantity }, ...], rejected:[{ cardId, quantity }, ...] }
   */
  static async updateDeckCards(username, deckId, data){
    try{
        let res = await this.request(`users/${username}/decks/${deckId}/cards`, data, "patch");
        return res.cards;

      }catch(err){
        console.error(err)
        return err;
      }
  }
  
  /**removeDeckCards
   * Removes cards from a specified user deck.
   * 
   * @param username - user attempting to make the change
   * @param deckId - ID of the target deck
   * @param data  - An array of cardIds like [cardId, cardId, ...]
   * @returns { removed:[cardId, cardId, ...] }
   */
  static async removeDeckCards(username, deckId, data){
    try{
        let res = await this.request(`users/${username}/decks/${deckId}/cards`, data, "delete");
        return res;

      }catch(err){
        console.error(err)
        return err;
      }
  }

  
  /**saveDeck
   * Determines when to add, update, and remove cards.
   * 
   * @param username - user attempting to make the change
   * @param deckId - ID of the target deck
   * @param data  - An array of cardIds like [cardId, cardId, ...]
   * @returns {[
   *   { added:[{ cardId, quantity }, ...], rejected:[{ cardId, quantity }, ...] },
   *   { added:[{ cardId, quantity }, ...], rejected:[{ cardId, quantity }, ...] },
   *   { removed:[cardId, cardId, ...] },
   *   { colorIdentity, deckName, deckOwner, description, format, id, tags }
   *  ]
   * }
   */
  static async saveDeck(username, deckId, data, colorIdentity){
    try{
      const promises = [];
      // Add cards
      if(data.add.length    > 0){
        promises.push(this.addDeckCards(username, deckId, { deckCards: data.add }))
      }
      // Update cards
      if(data.update.length > 0){
        promises.push(this.updateDeckCards(username, deckId, { deckCards: data.update }))
      }
      // Remove cards
      if(data.remove.length > 0){
        promises.push(this.removeDeckCards(username, deckId, { cardIds: data.remove }))
      }
      // Update colorIdentity of deck
      promises.push(this.updateDeck(username, deckId, { colorIdentity }))
      
      const res = await Promise.all(promises)
      return res;

    }catch(err){
      // Should never be encountered due to how other methods have a try-catch. This is only a precaution.
      console.error('One or more promises encountered errors:', err);
      return err;
    }
  }
}

export default Magidekt;



