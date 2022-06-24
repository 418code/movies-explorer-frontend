import EnterForm from '../EnterForm/EnterForm';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(name, email, password);
    resetForm();
  }

  return (
    <EnterForm name="registerForm" formHeader="Добро пожаловать!" onSubmit={handleSubmit}>
      <div className="EnterForm__fields">
        <label className="EnterForm__label">Имя</label>
        <input type="text" name="registerName" className="EnterForm__input" placeholder="Виталий" minLength="2" maxLength="64" onChange={handleNameChange} value={name} required/>
        <label className="EnterForm__label">E-mail</label>
        <input type="email" className="EnterForm__input EnterForm__input_type_error" text="pochta@yandex.ru" placeholder="pochta@yandex.ru" minLength="3" maxLength="128" onChange={handleEmailChange} value={email} required/>
        <label className="EnterForm__label">Пароль</label>
        <input type="password" className="EnterForm__input" placeholder="••••••••••••••" minLength="8" maxLength="128" onChange={handlePasswordChange} value={password} required/>
        <span className="EnterForm__input-error EnterForm__input-error_active">Что-то пошло не так...</span>
      </div>
      <button className="EnterForm__button">Зарегистрироваться</button>
      <p className="EnterForm__text">
        Уже зарегистрированы? <Link to="/signin" className="App__link App__link_color_orange">Войти</Link>
      </p>
    </EnterForm>
  );
}
