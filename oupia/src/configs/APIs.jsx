import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/Oupia";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "motels": `${SERVER_CONTEXT}/api/motels/`,
    "posts" : "https://jsonplaceholder.typicode.com/posts",
    "userInfo": (username) => `${SERVER_CONTEXT}/api/users/${username}/`,
}


export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization":  cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})