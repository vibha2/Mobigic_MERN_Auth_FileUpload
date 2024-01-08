import axios from "axios";

//for development
// const _baseURL = "http://192.168.29.240:4000";

const _baseURL = "http://localhost:4000";

const axios_api = axios.create({
  baseURL: _baseURL + "/api/v1/",
});

export default axios_api;
