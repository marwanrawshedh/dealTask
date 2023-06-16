import axios from "axios";
const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  responseType: "json",

  validateStatus: (status) => {
    return status < 400 && status >= 200;
  },
});
API.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken !== null) {
      config.headers.Authorization = accessToken || "";
    }
    // console.log(config, 'request interceptor config')
    return config;
  },
  (err) => {
    // console.log(err, 'request interceptor err')
    return Promise.reject(err);
  }
);
export default API;
