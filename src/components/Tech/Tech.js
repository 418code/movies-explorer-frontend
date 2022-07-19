import { useIntl } from 'react-intl';

export default function Tech(props) {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  const intl = useIntl();

  return (
    <section id="tech" className="Tech Landing__section Landing__section_padding_less Landing__section_color_beige">
      <h2 className="Landing__subheader Landing__subheader_position_top">
        {intl.formatMessage({id: 'tech', defaultMessage: 'Технологии'})}
      </h2>
      <h1 className="Landing__header">
        {intl.formatMessage({id: '7tech', defaultMessage: '7 технологий'})}
      </h1>
      <p className="Landing__text Tech__text">
        {intl.formatMessage({id: 'tech_description',
          defaultMessage: 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.'})}
      </p>
      <ul className="Tech__list">
        {techs.map(tech => <li key={tech}><p className="Tech__tile">{tech}</p></li>)}
      </ul>
    </section>
  );
}
