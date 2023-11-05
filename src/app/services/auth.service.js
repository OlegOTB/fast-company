import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create();
const authService = {
  register: async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  login: async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    // console.log({ url }, { email }, { password });
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post(`token`, {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};

export default authService;
