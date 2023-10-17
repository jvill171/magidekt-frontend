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
      // console.debug(`MAKING API CALL\n`, method, url, `\ndata:`, data, `\nheaders:`, headers)
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

}

export default Magidekt;



