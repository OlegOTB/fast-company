import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательня для заполнения" },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: { message: "Поле пароль обязательно для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: { message: "Минимальная длина пароля 8 символов", value: 8 }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length !== 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(isValid);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handelSubmit}>
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            {/* <br /> */}
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
