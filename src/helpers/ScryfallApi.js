import axios from "axios";

const BASE_URL = "https://api.scryfall.com";


class Scryfall {

    /** request()
     * 
     * Constructs & makes the API call to Scryfall API
    */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get")
            ? data
            : {};

        try {
            // Uncomment line below for more detailed debug
            // console.debug(`MAKING API CALL\n`, method, url, `\ndata:`, data, `\nparams:`, params)
            return await axios({ url, method, data, params})
        } catch (err) {
          console.error("API Error:", err.response);

          let {details, warnings} = err.response.data;
          let status = err.response.status;

          throw { details, status, warnings };
        }
    }

    /** getRandom()
     * 
     * Retreives a random card from Scryfall that meets the criteria "q"
     * retreives page "page" of results
     * 
     *      Returns 1 random Scryfall card
     */
    static async getRandom(q, page = 1){
        try{
            const data = { q, page }
            let res = await this.request(`cards/random`, data)
            return res.data;
        }catch(err){
            console.error(err)
            return err;
        }
    }

    /** search()
     * 
     * Queries the Scryfall API for all cards that meet the criteria "q"
     * retreives page "page" of results
     * 
     * Returns up to 175 Scryfall card per page/call
     */
    static async search(q, page = 1){
        try{
            const data = { q, page }
            let res = await this.request(`cards/search`, data)
            return res.data;
        }catch(err){
            console.error(err)
            return err;
        }
    }

    /** getByURL()
     * 
     * Retreives the result of an API call to the specified "targetURL"
     * 
     * This function can be useful alongside the above "search()" method
     * because "search()" also returns the next page uri, if it exists 
     * 
     */
    static async getByURL( targetURL ){
        try{
            const endpoint = targetURL.slice(BASE_URL.length + 1)
            let res = await this.request(endpoint)
            return res.data
        }catch(err){
            console.error(err)
            return err;
        }
    }

    /** resolveUIDs()
     *      data:[{cardId, quantity}, ...] => <Scryfall Response>
     * 
     * Retreives all specified cards from Scryfall, based on their UIDs
     * 
     * Returns all found cards Data
     * 
     */
    static async resolveUIDs( data ){
        
        const identifiers = data.map(c => ({"id": c.cardId}))
        try{
            let res = await this.request(`cards/collection`, {identifiers}, "post")
            return res.data
        }catch(err){
            console.error(err)
            return err;
        }
    }

}

export default Scryfall;



