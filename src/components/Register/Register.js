import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import EnterForm from '../EnterForm/EnterForm';
import { useFormWithValidation } from '../FormValidate/FormValidate';

export default function Register(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(false, {name: '', email: '', password: ''});
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister(values['name'], values['email'], values['password']);
    resetForm();
  }

  return (
    <EnterForm name="registerForm"
      formHeader={intl.formatMessage({
        id: 'welcome',
        defaultMessage: 'Добро пожаловать!',
        description: 'register form header'})}
      onSubmit={handleSubmit}>
      <div className="EnterForm__fields">
        <label className="EnterForm__label">{intl.formatMessage({id: 'name', defaultMessage: 'Имя'})}</label>
        <input name="name" type="text" className={`EnterForm__input ${errors['name'] ? 'EnterForm__input_type_error' : ''}`}
         placeholder={intl.formatMessage({id: 'placeholder_name', defaultMessage: 'Виталий'})} minLength="2" maxLength="30"
         value={values['name'] || ''} onChange={handleChange} required/>
        <span className={`EnterForm__input-error ${!isValid ? 'EnterForm__input-error_active' : ''}`}>{errors['name']}</span>
        <label className="EnterForm__label">E-mail</label>
        <input name="email" type="email" className={`EnterForm__input ${errors['email'] ? 'EnterForm__input_type_error' : ''}`}
         placeholder="pochta@yandex.ru" minLength="3" maxLength="128"
         value={values['email'] || ''} onChange={handleChange} required/>
        <span className={`EnterForm__input-error ${!isValid ? 'EnterForm__input-error_active' : ''}`}>{errors['email']}</span>
        <label className="EnterForm__label">{intl.formatMessage({id: 'password', defaultMessage: 'Пароль'})}</label>
        <input name="password" type="password" className={`EnterForm__input ${errors['password'] ? 'EnterForm__input_type_error' : ''}`}
         placeholder="••••••••••••••" minLength="8" maxLength="64" value={values['password'] || ''} onChange={handleChange} required/>
        <span className={`EnterForm__input-error ${!isValid ? 'EnterForm__input-error_active' : ''}`}>{errors['password']}</span>
      </div>
      <button className={`EnterForm__button ${!isValid ? 'EnterForm__button_disabled' : ''}`} disabled={!isValid}>
        {intl.formatMessage({id: 'register', defaultMessage: 'Зарегистрироваться'})}
      </button>
      <p className="EnterForm__text">
        {intl.formatMessage({id: 'alrdy_registered', defaultMessage: 'Уже зарегистрированы?'})}
        <Link to="/signin" className="App__link App__link_color_orange">
          {intl.formatMessage({id: 'enter', defaultMessage: 'Войти'})}
        </Link>
      </p>
    </EnterForm>
  );
}
