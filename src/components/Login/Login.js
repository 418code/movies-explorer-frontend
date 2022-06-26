import { Link } from 'react-router-dom';
import { useState } from 'react';
import EnterForm from '../EnterForm/EnterForm';


export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
    resetForm();
  }

  return (
    <EnterForm name="loginForm" formHeader="Рады видеть!" onSubmit={handleSubmit}>
      <div className="EnterForm__fields">
        <label className="EnterForm__label">E-mail</label>
        <input type="email" className="EnterForm__input EnterForm__input_type_error" text="pochta@yandex.ru" placeholder="pochta@yandex.ru" minLength="3" maxLength="128" value={email} onChange={handleEmailChange}/>
        <label className="EnterForm__label">Пароль</label>
        <input type="password" className="EnterForm__input" placeholder="••••••••••••••" minLength="3" maxLength="128" value={password} onChange={handlePasswordChange}/>
        <span className="EnterForm__input-error EnterForm__input-error_active">Что-то пошло не так...</span>
      </div>
      <button className="EnterForm__button">Войти</button>
      <p className="EnterForm__text">
        Ещё не зарегистрированы? <Link to="/signup" className="App__link App__link_color_orange">Регистрация</Link>
      </p>
    </EnterForm>
  );
}
