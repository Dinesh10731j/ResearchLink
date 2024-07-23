import axios from "axios";

const BaseUrl = 'http://localhost:7000'

export const axiosInstance = axios.create({
    baseURL:BaseUrl

})