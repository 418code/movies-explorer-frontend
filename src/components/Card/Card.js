export default function Card(props) {
  return (
    <li className="Card">
      <p className="Card__header">{props.header}</p>
      <p className="Card__time">{props.time}</p>
      <button className={`Card__button ${props.type ? `Card__button_type_${props.type}` : ''}`}></button>
      <img src={props.img} alt="картинка превью фильма" className="Card__img"/>
    </li>
  );
}
