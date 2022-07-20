import { useIntl, FormattedMessage } from 'react-intl';

export default function About() {

  const intl = useIntl();

  const feIds = ['about.figma', 'about.routes', 'about.httponly',
   'about.profile', 'about.valid', 'about.data', 'about.search', 'about.preview',
   'about.loader', 'about.savecards', 'about.localstorage', 'about.bem', 'about.domain'];

  const beIds = ['about.node', 'about.mongo', 'about.security', 'about.domain_back'];

  return (
    <section id="about" className="About Landing__section">
      <h2 className="Landing__subheader Landing__subheader_position_top">
        {intl.formatMessage({id: 'about'})}
      </h2>
      <div className="About__container">
        <h3 className="Landing__subheader">
          {intl.formatMessage({id: 'proj_goal', defaultMessage: 'Цель проекта'})}
        </h3>
        <p className="Landing__text">
          <FormattedMessage id="proj_goal_desc" defaultMessage={`Сделать простой поиск по списку 100 фильмов
           с <beat>публичного api</beat> и предоставить результат в виде карточек, при клике на которые открываются
            youtube трейлеры, со способностью сохранять и искать сохранённые фильмы для каждого зарегистрированного
             пользователя.`} values={{
              beat: chunks => (
                <a
                  className="App__link App__link_weight_bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://api.nomoreparties.co/beatfilm-movies"
                >
                {chunks}
                </a>),
             }} />
        </p>
        <h3 className="Landing__subheader">
          {intl.formatMessage({id: 'proj_steps', defaultMessage: 'Этапы проекта'})}
        </h3>
        <p className="Landing__text">
          {intl.formatMessage({id: 'proj_steps_desc', defaultMessage: 'Составление плана, работа над бэкендом, вёрстка, добавление функциональности и финальные доработки.'})}
        </p>
      </div>
      <div className="About__container">
        <h3 className="Landing__subheader">
          <a href="https://api.movies.418co.de" target="_blank" rel="noopener noreferrer" className="App__link">Back end / api.movies.418co.de</a>
        </h3>
        <ul className="App__list Landing__text About__list">
          {beIds.map(id =>
            <li className="About__list-item About__list-item_spread" key={id}>
              <FormattedMessage id={id} />
            </li>)}
        </ul>
        <h3 className="Landing__subheader">
          <a href="https://movies.418co.de" target="_blank" rel="noopener noreferrer"className="App__link">Front end / movies.418co.de</a>
        </h3>
        <ul className="App__list Landing__text About__list">
          {feIds.map(id =>
            <li className="About__list-item" key={id}>
              <FormattedMessage id={id} values={{
                figma: chunks => (
                  <a
                    className="App__link App__link_weight_bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.figma.com/file/E1rryxHLMEKjSFYM7ddN3m/?node-id=891%3A3857"
                  >
                  {chunks}
                  </a>),
                bem: chunks => (
                  <a
                    className="App__link App__link_weight_bold"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.bem.info/methodology/quick-start/"
                  >
                  {chunks}
                  </a>),
                }}/>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
