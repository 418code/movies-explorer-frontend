import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../FormValidate/FormValidate";
import EnterForm from "../EnterForm/EnterForm";

export default function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(false, { password: "", email: "" });
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(values["email"], values["password"]);
    resetForm();
  };

  return (
    <EnterForm
      name="loginForm"
      formHeader={intl.formatMessage({
        id: "glad_to_see",
        defaultMessage: "Рады видеть!",
      })}
      onSubmit={handleSubmit}
    >
      <div className="EnterForm__fields">
        <label className="EnterForm__label">E-mail</label>
        <input
          name="email"
          type="email"
          className={`EnterForm__input ${
            errors["email"] ? "EnterForm__input_type_error" : ""
          }`}
          placeholder={intl.formatMessage({
            id: "email_placeholder",
            defaultMessage: "pochta@yandex.ru",
          })}
          minLength="3"
          maxLength="128"
          value={values["email"] || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`EnterForm__input-error ${
            !isValid ? "EnterForm__input-error_active" : ""
          }`}
        >
          {errors["email"]}
        </span>
        <label className="EnterForm__label">
          {intl.formatMessage({ id: "password" })}
        </label>
        <input
          name="password"
          type="password"
          className={`EnterForm__input ${
            errors["password"] ? "EnterForm__input_type_error" : ""
          }`}
          placeholder="••••••••••••••"
          minLength="8"
          maxLength="64"
          value={values["password"] || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`EnterForm__input-error ${
            !isValid ? "EnterForm__input-error_active" : ""
          }`}
        >
          {errors["password"]}
        </span>
      </div>
      <button
        className={`EnterForm__button ${
          !isValid ? "EnterForm__button_disabled" : ""
        }`}
        disabled={!isValid}
      >
        {intl.formatMessage({ id: "enter" })}
      </button>
      <p className="EnterForm__text">
        {intl.formatMessage({
          id: "havent_registered",
          defaultMessage: "Ещё не зарегистрированы?",
        })}
        <Link to="/signup" className="App__link App__link_color_orange">
          {intl.formatMessage({
            id: "registration",
            defaultMessage: "Регистрация",
          })}
        </Link>
      </p>
    </EnterForm>
  );
}
