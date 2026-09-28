import axios from "axios";

export const apiClient = axios.create({
    // baseURL: "http://127.0.0.1:8000",
    baseURL: "https://trektripster-server-85xoyoli9-kavit2102s-projects.vercel.app/",
    // timeout: 30000,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})