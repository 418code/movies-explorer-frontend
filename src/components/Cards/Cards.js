import Card from "../Card/Card";
import { isEmpty } from '../../utils/utils';

export default function Cards(props) {
  return (
    <section className={`Cards ${props.visible ? 'Cards_visible' : ''}`}>
      <ul className="Cards__list" style={{ maxHeight: props.maxHeight }}>
          {!isEmpty(props.cards)
            ? props.cards.map(card =>
              <Card key={card.movieId} card={card} handleBtnClick={props.handleBtnClick}
               btnType={props.savedMoviesFlags[card.movieId] ? props.btnType : ''} />)
            : ''}
      </ul>
    </section>
  );
}
