import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, settUser] = useState({});
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
      const { content } = userService.get(data);
      settUser(content);
      // console.log(content);
      console.log(`currentUser`, currentUser);
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
      await createUser({ _id: data.localId, email, ...rest });
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
  useEffect(() => {
    if (error !== null) toast.error(error);
    setError(null);
  }, [error]);
  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      settUser(content);
      console.log(`content`, content);
    } catch (error) {}
  }
  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
      {children}
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
