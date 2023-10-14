import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [currentUser, settUser] = useState();
  const [error, setError] = useState(null);

  async function logIn({ email, password }) {
    // console.log(email, password);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      console.log(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      // console.log(error.response.data.error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        let errorObject = {};
        switch (message) {
          case `INVALID_LOGIN_CREDENTIALS`:
            errorObject = {
              email: "Неверное имя пльзователя или пароль."
            };
            break;
          case `EMAIL_NOT_FOUND`:
            errorObject = {
              email:
                "нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален."
            };
            break;
          case `INVALID_PASSWORD`:
            errorObject = {
              password: "Пароль недействителен или у пользователя нет пароля."
            };
            break;
          case `USER_DISABLED`:
            errorObject = {
              email: "Учетная запись пользователя отключена администратором."
            };

            break;
        }
        throw errorObject;
      }
      // throw new Error();
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function logOt() {
    localStorageService.removeAuthData();
    settUser(null);
    history.push("/");
  }

  async function updateUser(user) {
    try {
      await userService.create(user);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function signUp({ email, password, ...rest }) {
    // console.log(email, password);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
      // console.log(data);
      console.log(`currentUser`, currentUser);
    } catch (error) {
      errorCatcher(error);
      console.log(error.response.data.error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === `EMAIL_EXISTS`) {
          const errorObject = {
            email: "Пользователь с таким email уже существует."
          };
          throw errorObject;
        }
      }
      // throw new Error();
    }
  }
  function errorCatcher(error) {
    setError(error.message);
  }
  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      settUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (error !== null) toast.error(error);
    setError(null);
  }, [error]);
  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      settUser(content);
      console.log(`content`, content);
    } catch (error) {}
  }
  return (
    <AuthContext.Provider
      value={{ signUp, logIn, currentUser, logOt, updateUser }}
    >
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
