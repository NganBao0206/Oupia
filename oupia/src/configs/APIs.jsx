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
    "addPostRent" : `${SERVER_CONTEXT}/api/posts/rent/`,
    "addPostFind" : `${SERVER_CONTEXT}/api/posts/find/`,
    "userInfo": (username) => `${SERVER_CONTEXT}/api/users/${username}/`,
    "postInfo": (slug) => `${SERVER_CONTEXT}/api/posts/${slug}/`,
    "postImages": (slug) => `${SERVER_CONTEXT}/api/posts/${slug}/images/`,
    "postComments": (slug) => `${SERVER_CONTEXT}/api/posts/${slug}/comments/`,
    "mapAutocomplate": `${SERVER_CONTEXT}/api/map/autocomplete/`,
    "mapDetail": `${SERVER_CONTEXT}/api/map/detail/`,
    "addComment":  `${SERVER_CONTEXT}/api/comments/`,
    "register-landlord": `${SERVER_CONTEXT}/api/register-landlord/`,
    "favour": `${SERVER_CONTEXT}/api/favourites/`,
    "getFavourOfUser": `${SERVER_CONTEXT}/api/favourites/user/`,
    "getAuthToken": `${SERVER_CONTEXT}/api/auth-token/`,
    "follows": `${SERVER_CONTEXT}/api/follows/`,
    "followers": (username) => `${SERVER_CONTEXT}/api/follows/followers/${username}/`,
    "followings": (username) => `${SERVER_CONTEXT}/api/follows/followings/${username}/`,
    "countFollowers": (username) => `${SERVER_CONTEXT}/api/follows/followers-count/${username}/`,
    "countFollowings": (username) => `${SERVER_CONTEXT}/api/follows/followings-count/${username}/`,
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