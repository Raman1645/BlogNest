import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5050/api", // change for production
});

export default instance;
