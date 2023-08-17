import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toogleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p>
                У Вас уже есть аккаунт?
                <a role="button" onClick={toogleFormType}>
                  {" "}
                  Войти в аккаунт.
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Войти в аккаунт</h3>
              <LoginForm />
              <p>
                У Вас нет аккаунта?
                <a role="button" onClick={toogleFormType}>
                  {" "}
                  Зарегистрироваться.
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
