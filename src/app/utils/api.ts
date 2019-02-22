

const URL = "http://localhost:3000/api";

export const API = {
    URL:URL,
    auth:{
        signup:`${URL}/auth/signup`,
        login:`${URL}/auth/login`
    },
    images:`${URL}/images`,
    comments:`${URL}/comments`,
    stats:`${URL}/stats`,
    popularImages:`${URL}/images/popular`,
    newestImages:`${URL}/images/newest`,
    latestComments:`${URL}/comments/latest`,
    users:`${URL}/users`
}