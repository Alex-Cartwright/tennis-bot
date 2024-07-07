import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../config/config";

function authRequestInterceptor(config: InternalAxiosRequestConfig){
  
  if(config.headers){
    config.headers.Accept = "application/json";
  }

  return config;
}

const api = Axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("Error making request", error);

    return Promise.reject(error);
  }
);

export default api;