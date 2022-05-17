import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header(props) {
  return (
    <header className="Header">
      <img src={logo} alt="логотип Movie explorer" className="Header__logo" />
      {props.isLoggedIn ? <>
                            <button className="Header__menu-btn"></button>
                            <nav className="Header__nav">
                              <ul className="Header__list">
                                <li className="Header__list-item Header__list-item_space_close" key="movies">
                                  <Link to="/movies" className="App__link App__link_position_header App__link_size_pmed">Фильмы</Link>
                                </li>
                                <li className="Header__list-item" key="saved-movies">
                                  <Link to="/saved" className="App__link App__link_size_pmed">Сохранённые фильмы</Link>
                                </li>
                              </ul>
                              <Link to="/account" className="App__link App__link_position_header App__link_style_btn-rnd App__link_size_med">Аккаунт</Link>
                            </nav>
                          </>
                        :
                          <ul className="Header__list">
                            <li className="Header__list-item" key="sign-up">
                              <Link to="/sign-up" className="App__link App__link_position_header">Регистрация</Link>
                            </li>
                            <li className="Header__list-item" key="sign-in">
                              <Link to="/sign-in" className="App__link App__link_position_header App__link_style_btn">Войти</Link>
                            </li>
                          </ul>}
    </header>
  );
}
