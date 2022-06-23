import { Link } from 'react-router-dom';

export default function Menu(props) {
  const menuHandler = props.menuClickHandler;

  return (
    <div className={`Menu ${props.open ? 'Menu_visible' : ''}`}>
      <nav className="Menu__nav">
        <button onClick={menuHandler} className="Menu__close-btn"></button>
        <ul className="Menu__list">
          <li className="Menu__list-item" key="main">
            <Link to="/" onClick={menuHandler} className="App__link App__link_position_menu App__link_size_large">Главная</Link>
          </li>
          <li className="Menu__list-item" key="movies">
            <Link to="/movies" onClick={menuHandler} className="App__link App__link_style_undrl-bld App__link_position_menu App__link_size_large">Фильмы</Link>
          </li>
          <li className="Menu__list-item" key="saved-movies">
            <Link to="/saved-movies" onClick={menuHandler} className="App__link App__link_position_menu App__link_size_large">Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link to="/profile" onClick={menuHandler} className="App__link App__link_position_menu App__link_style_btn-rnd App__link_size_med">Аккаунт</Link>
      </nav>
    </div>
  );
}
