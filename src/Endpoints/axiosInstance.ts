import axios from "axios";

const BaseUrl = 'https://researchlink-api.onrender.com'

export const axiosInstance = axios.create({
    baseURL:BaseUrl

})