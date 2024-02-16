import axios from "axios";

export const serverAPI = axios.create({
    baseURL: "https://api.awan.fun/"
})