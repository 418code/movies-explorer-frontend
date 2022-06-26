import EnterForm from '../EnterForm/EnterForm';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <EnterForm name="loginForm" formHeader="Рады видеть!">
      <div className="EnterForm__fields">
        <label className="EnterForm__label">E-mail</label>
        <input type="email" className="EnterForm__input EnterForm__input_type_error" text="pochta@yandex.ru" placeholder="pochta@yandex.ru" minlength="3" maxlength="128"/>
        <label className="EnterForm__label">Пароль</label>
        <input type="password" className="EnterForm__input" placeholder="••••••••••••••" minlength="3" maxlength="128"/>
        <span className="EnterForm__input-error EnterForm__input-error_active">Что-то пошло не так...</span>
      </div>
      <button className="EnterForm__button">Войти</button>
      <p className="EnterForm__text">
        Ещё не зарегистрированы? <Link to="/signup" className="App__link App__link_color_orange">Регистрация</Link>
      </p>
    </EnterForm>
  );
}
