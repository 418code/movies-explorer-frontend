import { cardDimensions, mobileMaxWidth, tabletMaxWidth  } from "../../utils/utils";

export default function Loader(props) {
  const showMoreCards = () => {
    const width = window.innerWidth;
    if (width < mobileMaxWidth) {
       props.setMaxHeight(height => height + Math.floor(cardDimensions[320].height*2) + cardDimensions[320].gap*2);
    } else if ((mobileMaxWidth <= width) && (width <= tabletMaxWidth)) {
      props.setMaxHeight(height => height + Math.floor(cardDimensions[768].height) + cardDimensions[768].gap);
    } else if (width > tabletMaxWidth) {
      props.setMaxHeight(height => height + Math.floor(cardDimensions[1280].height) + cardDimensions[1280].gap);
    }
  };

  return (
    <section className={`Loader ${props.visible ? 'Loader_visible' : ''}`}>
      <button className="Loader__button" onClick={showMoreCards} type="button">Ещё</button>
    </section>
  );
}
