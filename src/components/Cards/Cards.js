import Card from "../Card/Card";
import cardPic from "../../images/card.png";

export default function Cards() {
  return (
    <section className="Cards">
      <ul className="Cards__list">
          <Card header="33 слова о дизайне" time="1ч 47м" key="card1" img={cardPic} />
          <Card header="33 слова о дизайне" time="1ч 47м" key="card2" img={cardPic} />
          <Card header="33 слова о дизайне" time="1ч 47м" key="card3" img={cardPic} type="set" />
          <Card header="33 слова о дизайне" time="1ч 47м" key="card4" img={cardPic} />
          <Card header="33 слова о дизайне" time="1ч 47м" key="card5" img={cardPic} type="set" />
      </ul>
    </section>
  );
}
