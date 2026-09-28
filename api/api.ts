import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://trektripster-server-one.vercel.app/",
    headers: {
        'Content-Type': 'application/json'
    }
})