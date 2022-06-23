import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="Menu">
      <nav className="Menu__nav">
        <button className="Menu__close-btn"></button>
        <ul className="Menu__list">
          <li className="Menu__list-item" key="main">
            <Link to="/" className="App__link App__link_position_menu App__link_size_large">Главная</Link>
          </li>
          <li className="Menu__list-item" key="movies">
            <Link to="/movies" className="App__link App__link_style_undrl-bld App__link_position_menu App__link_size_large">Фильмы</Link>
          </li>
          <li className="Menu__list-item" key="saved-movies">
            <Link to="/saved-movies" className="App__link App__link_position_menu App__link_size_large">Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link to="/profile" className="App__link App__link_position_menu App__link_style_btn-rnd App__link_size_med">Аккаунт</Link>
      </nav>
    </div>
  );
}
