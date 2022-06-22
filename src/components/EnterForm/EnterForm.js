import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function EnterForm() {
  return (
    <div className="EnterForm">
      <header className="EnterForm__header">
        <img src={logo} alt="логотип" />
        <h1 className="App__header">Добро пожаловать!</h1>
      </header>
      <main className="EnterForm__main">
        <form className="EnterForm__form">
          <div className="EnterForm__fields">
            <label htmlFor="" className="EnterForm__label">Имя</label>
            <input type="text" className="EnterForm__input" placeholder="Виталий" />
            <label htmlFor="" className="EnterForm__label">E-mail</label>
            <input type="email" className="EnterForm__input EnterForm__input_type_error" text="pochta@yandex.ru" placeholder="pochta@yandex.ru" />
            <label htmlFor="" className="EnterForm__label">Пароль</label>
            <input type="password" className="EnterForm__input" placeholder="••••••••••••••"/>
            <span className="EnterForm__input-error EnterForm__input-error_active">Что-то пошло не так...</span>
          </div>
          <button className="EnterForm__button">Зарегистрироваться</button>
          <p className="EnterForm__text">
            Уже зарегистрированы? <Link to="/signin" className="App__link App__link_color_orange">Войти</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
