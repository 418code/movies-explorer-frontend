export default function Footer() {
  return (
    <section className="Footer">
      <p className='Footer__text Footer__text_position_top'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="Footer__container">
        <ul className='Footer__list'>
          <li className='Footer__list-item'>
            <a href='https://practicum.yandex.ru/' className='App__link App__link_position_footer'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='Footer__list-item'>
            <a href='https://github.com/418code/' className='App__link App__link_position_footer'>
              Github
            </a>
          </li>
          <li className='Footer__list-item'>
            <a href='https://www.facebook.com/' className='App__link App__link_position_footer'>
              Facebook
            </a>
          </li>
        </ul>
        <p className='Footer__text Footer__text_position_bottom'>© 2022</p>
      </div>
    </section>
  );
}