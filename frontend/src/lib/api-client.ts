import Axios from "axios";
import { API_URL } from "../config";

const api = Axios.create({
  baseURL: API_URL,
});

export default api;