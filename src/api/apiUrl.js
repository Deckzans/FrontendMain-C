import axios from "axios";

export const apiApp = axios.create({ 
    baseURL: 'http://localhost:3000'
})