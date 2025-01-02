import axios from 'axios';
import { BASE_URL } from './constants';

const axiosIntance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
  });
axiosIntance.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error)=> {
      // Do something with request error
      return Promise.reject(error);
    }
);
export default axiosIntance;