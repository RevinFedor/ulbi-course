import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '../const/localStorage';

export const $api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || 'none',
    },
    
});
