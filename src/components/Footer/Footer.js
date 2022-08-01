import { useIntl } from "react-intl";

export default function Footer(props) {
  const intl = useIntl();

  return (
    <section className="Footer">
      <p className="Footer__text Footer__text_position_top">
        {intl.formatMessage({
          id: "study_project_beat",
          defaultMessage: "Учебный проект Яндекс.Практикум х BeatFilm.",
        })}
      </p>
      <div className="Footer__container">
        <ul className="Footer__list">
          <li className="Footer__list-item" key="yp">
            <a
              href="https://practicum.com/software-engineer/"
              target="_blank"
              rel="noreferrer"
              className="App__link App__link_position_footer"
            >
              {intl.formatMessage({
                id: "yndx.practicum",
                defaultMessage: "Яндекс.Практикум",
              })}
            </a>
          </li>
          <li className="Footer__list-item" key="gh">
            <a
              href="https://github.com/418code/"
              target="_blank"
              rel="noreferrer"
              className="App__link App__link_position_footer"
            >
              Github
            </a>
          </li>
        </ul>
        <p className="Footer__text Footer__text_position_bottom">© 2022</p>
      </div>
    </section>
  );
}
