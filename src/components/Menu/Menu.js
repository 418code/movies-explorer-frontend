import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

export default function Menu(props) {
  const menuHandler = props.menuClickHandler;
  const intl = useIntl();

  return (
    <div className={`Menu ${props.open ? "Menu_visible" : ""}`}>
      <nav className="Menu__nav">
        <button onClick={menuHandler} className="Menu__close-btn"></button>
        <ul className="Menu__list">
          <li className="Menu__list-item" key="main">
            <Link
              to="/"
              onClick={menuHandler}
              className="App__link App__link_position_menu App__link_size_large"
            >
              {intl.formatMessage({
                id: "home_page",
                defaultMessage: "Главная",
              })}
            </Link>
          </li>
          <li className="Menu__list-item" key="movies">
            <Link
              to="/movies"
              onClick={menuHandler}
              className="App__link App__link_style_undrl-bld App__link_position_menu App__link_size_large"
            >
              {intl.formatMessage({ id: "movies", defaultMessage: "Фильмы" })}
            </Link>
          </li>
          <li className="Menu__list-item" key="saved-movies">
            <Link
              to="/saved-movies"
              onClick={menuHandler}
              className="App__link App__link_position_menu App__link_size_large"
            >
              {intl.formatMessage({
                id: "saved_movies",
                defaultMessage: "Сохранённые фильмы",
              })}
            </Link>
          </li>
        </ul>
        <Link
          to="/profile"
          onClick={menuHandler}
          className="App__link App__link_position_menu App__link_style_btn-rnd App__link_size_med"
        >
          {intl.formatMessage({ id: "account", defaultMessage: "Аккаунт" })}
        </Link>
      </nav>
    </div>
  );
}
