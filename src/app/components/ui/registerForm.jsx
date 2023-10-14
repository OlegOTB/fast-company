import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
// import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const { isLoading: isLoadingQual, qualities: qual } = useQualities();
  const qualities = !isLoadingQual
    ? qual?.map((q) => {
        return { label: q.name, value: q._id };
      })
    : [];
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "",
    name: "",
    qualities: [],
    licence: false
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const { isLoading: isLoadingProf, professions: prof } = useProfessions();
  // console.log(prof);
  const professions = !isLoadingProf
    ? prof?.map((p) => {
        return { label: p.name, value: p._id };
      })
    : {};

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательня для заполнения" },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: { message: "Имя пользователя обязательно для заполнения" },
      min: { message: "Минимальная длина имени 3 символа", value: 3 }
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
    },
    profession: {
      isRequired: { message: "Необходимо выбрать профессию" }
    },
    sex: {
      isRequired: { message: "Требуется выбрать пол" }
    },
    qualities: {
      isRequired: { message: "Требуется выбрать минимум одно качество" }
    },
    licence: {
      isRequired: { message: "Требуется подтвердить лицензионное соглашение" }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length !== 0;
  };
  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log(target.name, target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) return;
    const newdata = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    try {
      await signUp(newdata);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя пользователя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
      <SelectField
        label="Выберите Вашу профессию"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        defaultOption="Выберите профессию..."
        options={professions}
        error={errors.profession}
      />
      <RadioField
        label="Ваш пол"
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        name="sex"
        error={errors.sex}
      />
      <MultiSelectField
        label="Укажите Ваши личные качества"
        name="qualities"
        onChange={handleChange}
        options={qualities}
        defaultValue={data.qualities}
        error={errors.qualities}
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
