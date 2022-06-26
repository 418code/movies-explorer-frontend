import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  const navigate = useNavigate();

  return (
      <>
        <main className="NotFound">
          <p className="NotFound__header">404</p>
          <p className="NotFound__message">Страница не найдена</p>
        </main>
        <aside>
          <button onClick={() => navigate(-1)} className="NotFound__button App__link App__link_size_adaptive App__link_color_orange App__link_position_bottom">Назад</button>
        </aside>
      </>
  );
}