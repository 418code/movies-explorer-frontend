export default function About() {
  return (
    <section id="about" className="About Landing__section">
      <h2 className="Landing__subheader Landing__subheader_position_top">
        О проекте
      </h2>
      <div className="About__container">
        <h3 className="Landing__subheader">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="Landing__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
        <h3 className="Landing__subheader">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="Landing__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <table className="About__table">
        <colgroup>
          <col className="About__col"/>
          <col/>
        </colgroup>
        <tr className="About__row">
          <td className="About__cell About__cell_color_green">1 неделя</td>
          <td className="About__cell About__cell_color_beige">4 недели</td>
        </tr>
        <tr className="About__row About__row_font_light">
          <td className="About__cell">Back-end</td>
          <td className="About__cell">Front-end</td>
        </tr>
      </table>
    </section>
  );
}
