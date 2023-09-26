import axios from 'axios';
const BASE_URL = 'https://onlinequizapp.up.railway.app/api/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});