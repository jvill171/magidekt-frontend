import axios from "axios";

const BASE_URL = "https://api.scryfall.com";


class Scryfall {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get")
            ? data
            : {};

        try {
            // Uncomment line below for more detailed debug
            // console.debug(`MAKING API CALL\n`, method, url, `\ndata:`, data)
            return await axios({ url, method, data, params})
        } catch (err) {
          console.error("API Error:", err.response);

          let {details, warnings} = err.response.data;
          let status = err.response.status;

          throw { details, status, warnings };
        }
    }

    static async getRandom(q){
        try{
            const data = { q }
            let res = await this.request(`cards/random`, data)
            return res.data;
        }catch(err){
            console.error(err)
            return err;
        }
    }

    static async search(q, page){
        try{
            const data = { q, page }
            let res = await this.request(`cards/random`, data)
            return res.data;
        }catch(err){
            console.error(err)
            return err;
        }
    }

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

}

export default Scryfall;



