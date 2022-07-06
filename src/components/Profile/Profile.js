import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../FormValidate/FormValidate';

export default function Profile (props) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, } = useFormWithValidation(true, currentUser);

  const disabledButtonCondition = (!isValid ||
    (values.name === currentUser.name && values.email === currentUser.email));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleProfileUpdate(values['name'], values['email']);
  }

  return (
    <>
      <Header menuClickHandler={props.menuClickHandler} />
      <main className="Profile">
        <form className="Profile__form" onSubmit={handleSubmit}>
          <h1 className="App__header Profile__header">Привет, {currentUser.name}!</h1>
          <table className="Profile__table">
            <tbody>
              <tr className="Profile__row Profile__row_position_top">
                <td className="Profile__cell">Имя</td>
                <td>
                  <input name="name" type="text" className={`Profile__input ${errors['name'] ? 'Profile__input_type_error' : ''}`}
                    minLength="3" maxLength="64" value={values['name'] || ''} onChange={handleChange} required/>
                </td>
              </tr>
              <tr className="Profile__row">
                <td className="Profile__cell">E-mail</td>
                <td>
                  <input name="email" type="email" className={`Profile__input ${errors['email'] ? 'Profile__input_type_error' : ''}`}
                    placeholder="pochta@yandex.ru" minLength="3" maxLength="128" value={values['email'] || ''} onChange={handleChange} required/>
                </td>
              </tr>
            </tbody>
          </table>
          <ul className="App__list Profile__list">
            <li key="edit">
              <button className={`Profile__button ${disabledButtonCondition ?
                'Profile__button_disabled' : ''}`} disabled={disabledButtonCondition}>Редактировать</button>
            </li>
            <li key="logout">
              <Link to="/" onClick={props.handleLogout} className="App__link Profile__link Profile__link_type_bold">Выйти из аккаунта</Link>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
