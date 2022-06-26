import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default function Profile (props) {
  return (
    <>
      <Header isLoggedIn={true} menuClickHandler={props.menuClickHandler} />
      <main className="Profile">
        <h1 className="App__header Profile__header">Привет, Виталий!</h1>
        <table className="Profile__table">
          <tbody>
            <tr className="Profile__row Profile__row_position_top">
              <td className="Profile__cell">Имя</td>
              <td>Виталий</td>
            </tr>
            <tr className="Profile__row">
              <td className="Profile__cell">E-mail</td>
              <td>pochta@yandex.ru</td>
            </tr>
          </tbody>
        </table>
        <ul className="App__list Profile__list">
          <li key="edit">
            <Link to="/edit" className="App__link Profile__link">Редактировать</Link>
          </li>
          <li key="logout">
            <Link to="/" onClick={props.onLogout} className="App__link Profile__link Profile__link_type_bold">Выйти из аккаунта</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
