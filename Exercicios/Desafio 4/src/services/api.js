import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.211:3333",
});

export default api;
