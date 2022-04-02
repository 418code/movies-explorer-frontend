import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
      <>
        <section className="NotFound">
          <p className="NotFound__header">404</p>
          <p className="NotFound__message">Страница не найдена</p>
        </section>
        <aside>
          <Link to={"#"} className="App__link App__link_size_adaptive App__link_color_orange App__link_position_bottom">Назад</Link>
        </aside>
      </>
  );
}