import { useIntl, FormattedMessage } from 'react-intl';

import vrman from '../../images/vrman.webp';

export default function Student() {
  const intl = useIntl();

  return (
    <section id="student" className="Landing__section Student">
      <h2 className="Landing__subheader Landing__subheader_position_top Student__subheader">
        {intl.formatMessage({id: 'student', defaultMessage: 'Студент'})}
      </h2>
      <article className="Student__article">
        <img src={vrman} alt="фото" className="Student__pic"/>
        <h1 className="Landing__header Student__header">
          {intl.formatMessage({id: 'my_name', defaultMessage: 'Максим'})}
        </h1>
        <h3 className="Landing__text Student__text Student__text_weight_bold">
          {intl.formatMessage({id: 'fe_dev', defaultMessage: 'Фронтенд-разработчик'})}
        </h3>
        <p className="Landing__text Student__text">
          <FormattedMessage
            id="about_me"
            defaultMessage = {`Решил стать веб разработчиком тестируя
             <sdc>беспилотные автомобили Гугла</sdc> по контракту в Кремниевой Долине.
             <chm>Тур по Музею Компьютерной истории</chm>
             и разные конференции укрепили мою мотивацию. Нравится писать код используя
             очки виртуальной реальности Oculus Quest 2,
             гулять на природе, медитировать,
             слушать музыку, и заниматься импров комедией. Закончил бакалавриат
             университета Коннектикута по маркетингу, управлению и финансам.`}
            values={{
              sdc: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/watch?v=B8R148hFxPw"
                >
                {chunks}
                </a>
              ),
              chm: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.guidigo.com/Web/CHM-Revolution-Tour/DHTH2i2fYjA/StreetView/1/Calculators-Abacus"
                >
                {chunks}
                </a>
              ),
              yndx: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://yandex.ru"
                >
                {chunks}
                </a>
              ),
              ypen: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://practicum.yandex.com/web/"
                >
                {chunks}
                </a>
              ),
              ypru: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://practicum.yandex.ru/web/"
                >
                {chunks}
                </a>
              ),
            }}/>
        </p>
        <p className="Landing__text Student__text Student__text_area_418">
          <FormattedMessage
            id="418code"
            defaultMessage={`HTTP код ошибки <teapot>418 I'm a teapot</teapot> сообщает о том,
             что сервер не может приготовить кофе, потому что он чайник.`}
            values={{
              teapot: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418"
                >
                {chunks}
                </a>
              ),
            }}
          />
        </p>
        <ul className="App__list Student__list Student__list_size_small">
          <li key='github'>
            <a href="https://github.com/418code/" target="_blank" rel="noreferrer"className="App__link App__link_weight_bold">Github</a>
          </li>
        </ul>
      </article>
      <h4 className="Student__miniheader">
        {intl.formatMessage({id: 'portfolio', defaultMessage: 'Портфолио'})}
      </h4>
      <ul className="App__list Student__list Student__list_vertical">
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li key="how2learn">
              <a href="https://github.com/418code/how-to-learn" target="_blank" rel="noreferrer" className="App__link">
                {intl.formatMessage({id: 'static', defaultMessage: 'Статичный сайт'})}
              </a>
            </li>
            <li key="how2learn-arrow">
              <a href="https://github.com/418code/how-to-learn" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li key="rutravel">
              <a href="https://github.com/418code/russian-travel" target="_blank" rel="noreferrer" className="App__link">
                {intl.formatMessage({id: 'responsive', defaultMessage: 'Адаптивный сайт'})}
              </a>
            </li>
            <li key="rutravel-arrow">
              <a href="https://github.com/418code/russian-travel" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
        <li className="Student__list-item">
          <ul className="App__list Student__list Student__list_size_large">
            <li key="mesto">
              <a href="https://github.com/418code/react-mesto-frontend" target="_blank" rel="noreferrer" className="App__link">
                {intl.formatMessage({id: 'spa', defaultMessage: 'Одностраничное приложение'})}
              </a>
            </li>
            <li key="mesto-arrow">
              <a href="https://github.com/418code/react-mesto-frontend" target="_blank" rel="noreferrer" className="App__link Student__link"></a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}
