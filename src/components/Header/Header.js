import { useIntl } from "react-intl";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../images/logo.svg";

export default function Header(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const intl = useIntl();

  return (
    <header className="Header">
      <Link to="/">
        <img
          src={logo}
          alt={intl.formatMessage({ id: "logo" })}
          className="Header__logo"
        />
      </Link>
      {isLoggedIn ? (
        <>
          <button
            onClick={props.menuClickHandler}
            aria-label={intl.formatMessage({
              id: "mobile_menu_btn_aria",
              defaultMessage: "Кнопка меню",
            })}
            className="Header__menu-btn"
          ></button>
          <nav className="Header__nav">
            <ul className="Header__list">
              <li
                className="Header__list-item Header__list-item_space_close"
                key="movies"
              >
                <Link
                  to="/movies"
                  className="App__link App__link_position_header App__link_size_pmed"
                >
                  {intl.formatMessage({ id: "movies" })}
                </Link>
              </li>
              <li className="Header__list-item" key="saved-movies">
                <Link
                  to="/saved-movies"
                  className="App__link App__link_size_pmed"
                >
                  {intl.formatMessage({ id: "saved_movies" })}
                </Link>
              </li>
            </ul>
            <Link
              to="/profile"
              className="App__link App__link_position_header App__link_style_btn-rnd App__link_size_med"
            >
              {intl.formatMessage({ id: "account" })}
            </Link>
          </nav>
        </>
      ) : (
        <ul className="Header__list">
          <li className="Header__list-item" key="sign-up">
            <Link to="/signup" className="App__link App__link_position_header">
              {intl.formatMessage({ id: "registration" })}
            </Link>
          </li>
          <li className="Header__list-item" key="sign-in">
            <Link
              to="/signin"
              className="App__link App__link_position_header App__link_style_btn"
            >
              {intl.formatMessage({ id: "enter" })}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
