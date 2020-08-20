import Axios from 'axios'

const URL = window.location.origin.includes('localhost') ? process.env.REACT_APP_SERVER : "/api"

const axios = Axios.create({
    baseURL: URL,
    headers: {
        "x-auth": JSON.parse(localStorage.getItem('authToken'))?.token
    }
})

export default axios