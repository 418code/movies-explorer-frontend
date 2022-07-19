import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../FormValidate/FormValidate';
import { LOCALES } from '../../i18n';

export default function Profile (props) {

  const {currentUser} = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, } = useFormWithValidation(true, currentUser);

  const intl = useIntl();

  const disabledButtonCondition = (isValid &&
    (values.name === currentUser.name &&
      values.email === currentUser.email &&
      values.locale === currentUser.locale));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleProfileUpdate(values['name'], values['email'], values['locale']);
  }

  return (
    <>
      <Header menuClickHandler={props.menuClickHandler} />
      <main className="Profile">
        <form className="Profile__form" onSubmit={handleSubmit}>
          <h1 className="App__header Profile__header">
            {intl.formatMessage({id: 'hi', defaultMessage: 'Привет, '})}{currentUser.name}!
          </h1>
          <table className="Profile__table">
            <tbody>
              <tr className="Profile__row">
                <td className="Profile__cell">
                  {intl.formatMessage({id: 'name'})}
                </td>
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
              <tr className="Profile__row">
                <td className="Profile__cell">
                  {intl.formatMessage({id: 'locale', defaultMessage: 'Язык'})}
                </td>
                <td>
                  <select className="Profile__select" name="locale" value={values['locale'] || currentUser.locale} onChange={handleChange}>
                    <option value={LOCALES.ENGLISH}>English</option>
                    <option value={LOCALES.RUSSIAN}>Русский</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <ul className="App__list Profile__list">
            <li key="edit">
              <button className={`Profile__button ${disabledButtonCondition ?
                'Profile__button_disabled' : ''}`} disabled={disabledButtonCondition}>
                  {intl.formatMessage({id: 'edit', defaultMessage: 'Редактировать'})}
              </button>
            </li>
            <li key="logout">
              <Link to="/" onClick={props.handleLogout} className="App__link Profile__link Profile__link_type_bold">
                {intl.formatMessage({id: 'exit_account', defaultMessage: 'Выйти из аккаунта'})}
              </Link>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
