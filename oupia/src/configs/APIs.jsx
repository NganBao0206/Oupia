import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/Oupia";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "motels": `${SERVER_CONTEXT}/api/motels/`,
    "posts" : `${SERVER_CONTEXT}/api/posts/`,
    "userInfo": (username) => `${SERVER_CONTEXT}/api/users/${username}/`,
    "postInfo": (slug) => `${SERVER_CONTEXT}/api/posts/${slug}/`,
    "postImages": (slug) => `${SERVER_CONTEXT}/api/posts/${slug}/images/`,
    "mapAutocomplate": `${SERVER_CONTEXT}/api/map/autocomplete/`,
    "mapDetail": `${SERVER_CONTEXT}/api/map/detail/`,
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