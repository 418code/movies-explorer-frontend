import { convertDuration } from '../../utils/utils';

export default function Card(props) {
  const card = props.card;

  return (
    <li key={card.movieId} className="Card">
      <p className="Card__header">{card.nameRU}</p>
      <p className="Card__time">{convertDuration(card.duration)}</p>
      <button className={`Card__button ${props.btnType ? `Card__button_type_${props.btnType}` : ''}`} onClick={() => props.handleBtnClick(card)}></button>
      <a href={card.trailer} target="_blank" rel="noreferrer" className="Card__link">
        <img src={card.image} alt="картинка превью фильма" className="Card__img"/>
      </a>
    </li>
  );
}
