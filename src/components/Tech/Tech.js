export default function Tech() {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  return (
    <section id="tech" className="Tech Landing__section Landing__section_padding_less Landing__section_color_beige">
      <h2 className="Landing__subheader Landing__subheader_position_top">Технологии</h2>
      <h1 className="Landing__header">7 технологий</h1>
      <p className="Landing__text Tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="Tech__list">
        {techs.map(tech => <li key={tech}><p className="Tech__tile">{tech}</p></li>)}
      </ul>
    </section>
  );
}
