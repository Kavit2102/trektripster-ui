import axios from "axios";

export const apiClient = axios.create({
    // baseURL: "http://127.0.0.1:8000/",
    // baseURL: "https://genrun-server-l1702uhvy-kavit2102s-projects.vercel.app/",
    baseURL: "https://genrun-server-l1702uhvy-kavit2102s-projects.vercel.app/",
    headers: {
        'Content-Type': 'application/json'
    }
})