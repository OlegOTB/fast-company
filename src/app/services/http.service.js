import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.API_END_POINT;

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    // console.log("interceptors");
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      // logger.log(error);
      console.log(error);
      toast.error("Что-то пошло не так. Попытайтесь еще раз позже.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default httpService;
