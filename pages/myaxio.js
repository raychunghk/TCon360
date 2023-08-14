import { parseCookies, setCookie } from "nookies";
import axios from 'axios';
const cookies = parseCookies();
const tokenCookie = cookies.token;
const api = axios.create({
  baseURL: 'http://your-api-base-url.com',
  headers: {
    Authorization: `Bearer ${tokenCookie}`
  }
});

export default api;