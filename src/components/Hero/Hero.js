import { useIntl } from "react-intl";

export default function Hero(props) {
  const intl = useIntl();

  return (
    <section className="Hero">
      <h1 className="Hero__text">
        {intl.formatMessage({
          id: "study_project",
          defaultMessage: "Учебный проект студента факультета Веб-разработки.",
        })}
      </h1>
      <ul className="Hero__list">
        <li className="Hero__list-item" key="project">
          <a
            href="#about"
            className="App__link App__link_size_adaptive-hero App__link_weight_bold App__link_style_btn-hero"
          >
            {intl.formatMessage({ id: "about", defaultMessage: "О проекте" })}
          </a>
        </li>
        <li className="Hero__list-item" key="technology">
          <a
            href="#tech"
            className="App__link App__link_size_adaptive-hero App__link_weight_bold App__link_style_btn-hero"
          >
            {intl.formatMessage({ id: "tech", defaultMessage: "Технологии" })}
          </a>
        </li>
        <li className="Hero__list-item" key="student">
          <a
            href="#student"
            className="App__link App__link_size_adaptive-hero App__link_weight_bold App__link_style_btn-hero"
          >
            {intl.formatMessage({ id: "student", defaultMessage: "Студент" })}
          </a>
        </li>
      </ul>
    </section>
  );
}
