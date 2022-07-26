import { useIntl } from 'react-intl';
import htmlLogo from '../../images/html5.svg';
import cssLogo from '../../images/css3.svg';
import jsLogo from '../../images/js.svg';
import reactLogo from '../../images/react.svg';
import githubLogo from '../../images/github.svg';
import expressLogo from '../../images/express.svg';
import mongoDBLogo from '../../images/mongodb.svg';

export default function Tech(props) {
  const logos = [htmlLogo, cssLogo, jsLogo, reactLogo, githubLogo, expressLogo, mongoDBLogo];
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
        {logos.map(tech => <li key={tech}><img src={tech} alt="tech logo" className="Tech__logo  App__heartbeat" /></li>)}
      </ul>
    </section>
  );
}
