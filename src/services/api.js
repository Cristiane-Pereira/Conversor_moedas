import axios from "axios";

//Base URL: https://free.currconv.com/api/v7/
//Parametro: convert?q=USD_PHP&compact=ultra&apiKey=db86f086a9bfc51fb5fc
const api = axios.create({
  baseURL: "https://free.currconv.com/api/v7",
});

export default api;
