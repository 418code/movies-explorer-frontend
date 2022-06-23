import photo from '../../images/photo.png';

export default function Student() {
  return (
    <section id="student" className="Landing__section Student">
      <h2 className="Landing__subheader Landing__subheader_position_top Student__subheader">Студент</h2>
      <article className="Student__article">
        <img src={photo} alt="фото" className="Student__pic"/>
        <h1 className="Landing__header Student__header">Виталий</h1>
        <h3 className="Landing__text Student__text Student__text_weight_bold">Фронтенд-разработчик, 30 лет</h3>
        <p className="Landing__text Student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <ul className="App__list Student__list Student__list_size_small">
          <li>
            <a href="#" className="App__link App__link_weight_bold">Facebook</a>
          </li>
          <li>
            <a href="https://github.com/418code/" className="App__link App__link_weight_bold">Github</a>
          </li>
        </ul>
      </article>
      <h4 className="Student__miniheader">Портфолио</h4>
      <ul className="App__list Student__list Student__list_vertical">
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li>
              <a href="https://github.com/418code/how-to-learn" target="_blank" rel="noreferrer" className="App__link">Статичный сайт</a>
            </li>
            <li>
              <a href="https://github.com/418code/how-to-learn" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li>
              <a href="https://github.com/418code/russian-travel" target="_blank" rel="noreferrer" className="App__link">Адаптивный сайт</a>
            </li>
            <li>
              <a href="https://github.com/418code/russian-travel" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li>
              <a href="https://github.com/418code/react-mesto-api-full" target="_blank" rel="noreferrer" className="App__link">Одностраничное приложение</a>
            </li>
            <li>
              <a href="https://github.com/418code/react-mesto-api-full" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}
