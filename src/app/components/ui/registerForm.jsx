import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [qualities, setQualities] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();

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
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const isValid = Object.keys(errors).length === 0;

  const getProfessionById = (id) => {
    // for (const prof of professions) {
    //   if (prof.value === id) {
    //     return { _id: prof.value, name: prof.label };
    //   }
    // }
    const buff = Object.keys(professions).find(
      (prof) => professions[prof]._id === id
    );
    return { ...professions[buff] };
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        // if (elem.value === qualities[quality].value) {
        if (elem.value === qualities[quality]._id) {
          qualitiesArray.push({
            // _id: qualities[quality].value,
            // name: qualities[quality].label,
            _id: qualities[quality]._id,
            name: qualities[quality].name,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
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
