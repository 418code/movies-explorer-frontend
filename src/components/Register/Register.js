import EnterForm from '../EnterForm/EnterForm';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <EnterForm name="registerForm" formHeader="Добро пожаловать!">
      <div className="EnterForm__fields">
        <label className="EnterForm__label">Имя</label>
        <input type="text" className="EnterForm__input" placeholder="Виталий" />
        <label className="EnterForm__label">E-mail</label>
        <input type="email" className="EnterForm__input EnterForm__input_type_error" text="pochta@yandex.ru" placeholder="pochta@yandex.ru" />
        <label className="EnterForm__label">Пароль</label>
        <input type="password" className="EnterForm__input" placeholder="••••••••••••••"/>
        <span className="EnterForm__input-error EnterForm__input-error_active">Что-то пошло не так...</span>
      </div>
      <button className="EnterForm__button">Зарегистрироваться</button>
      <p className="EnterForm__text">
        Уже зарегистрированы? <Link to="/signin" className="App__link App__link_color_orange">Войти</Link>
      </p>
    </EnterForm>
  );
}
