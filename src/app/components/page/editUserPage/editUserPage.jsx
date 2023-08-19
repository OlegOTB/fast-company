import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditUserPage = ({ id }) => {
  if (!id) return;
  const [qualities, setQualities] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  const [message, setMessage] = useState("Получение данных пользователя");
  const [user, setUser] = useState();
  const history = useHistory();

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
  const setUserQualities = (arr) => {
    const buff = [];
    arr.forEach((elem) => {
      buff.push({ label: elem.name, value: elem._id });
      // console.log("buff", buff);
    });
    return buff;
  };
  useEffect(() => {
    api.users.getById(id).then((user) => {
      setUser(user);
      if (user === null || user === undefined) {
        setMessage("Пользователь не найден");
      } else {
        data.name = user.name;
        data.email = user.email;
        data.profession = user.profession._id;
        data.sex = user.sex;
        data.qualities = setUserQualities(user.qualities);
        setData(data);
        validate();
      }
    });
  }, []);
  useEffect(() => {
    validate();
  }, [data]);
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  if (user === null || user === undefined) {
    return message;
  }

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
    user.name = data.name;
    user.email = data.email;
    user.sex = data.sex;
    user.profession = getProfessionById(profession);
    user.qualities = getQualities(qualities);
    setUser(user);
    api.users.update(id, user);
    history.push("/Users");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Изменение данных пользователя</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ФИО"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={undefined}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
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
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Сохранить изменения
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;

EditUserPage.defaultProps = { id: "" };

EditUserPage.propTypes = {
  id: PropTypes.string
};
