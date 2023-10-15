import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = ({ id }) => {
  if (!id) return;
  const { getUserById } = useUser();
  const user = getUserById(id);
  if (user === null || user === undefined) {
    return <h5>Пользователь не найден</h5>;
  }
  // console.log(user);

  const history = useHistory();
  const { currentUser, updateUser } = useAuth();
  if (currentUser._id !== id) {
    history.push(`/Users/${currentUser._id}/edit`);
  }
  const setUserQualities = (arr) => {
    const buff = [];
    arr.forEach((elem) => {
      buff.push({
        label: getQualities(elem).name,
        value: getQualities(elem)._id
      });
      // console.log("buff", buff);
    });
    return buff;
  };
  const {
    isLoading: isLoadingQual,
    qualities: qual,
    getQualities
  } = useQualities();
  const qualities = !isLoadingQual
    ? qual?.map((q) => {
        return { label: q.name, value: q._id };
      })
    : [];
  const [errors, setErrors] = useState({});
  const [isLoading, setLoadingUserData] = useState(false);
  const { isLoading: isLoadingProf, professions: prof } = useProfessions();
  // console.log(prof);
  const professions = !isLoadingProf
    ? prof?.map((p) => {
        return { label: p.name, value: p._id };
      })
    : {};

  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя пользователя обязательно для заполнения" },
      min: { message: "Минимальная длина имени 3 символа", value: 3 }
    },
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
    if (!isLoadingQual && !isLoadingProf) {
      setData((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email,
        sex: user.sex,
        profession: user.profession,
        qualities: setUserQualities(user.qualities)
      }));
      // validate();
    }
  }, [isLoadingQual, isLoadingProf]);
  useEffect(() => {
    validate();
    setLoadingUserData(!isLoadingQual && !isLoadingProf);
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) return;
    user.name = data.name;
    user.email = data.email;
    user.sex = data.sex;
    user.profession = data.profession;
    user.qualities = data.qualities.map((q) => q.value);
    console.log("id, user", id, user);
    try {
      await updateUser(user);
      history.push(`/Users/${id}`);
    } catch (error) {
      setErrors(error);
    }
  };
  if (!isLoading) {
    return <h5>Получение данных пользователя....</h5>;
  }
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
              error={errors.name}
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
            {/* {console.log("data.qualities", data.qualities)} */}
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
