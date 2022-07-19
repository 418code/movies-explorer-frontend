import { useCallback } from 'react';
import { cardDimensions, mobileMaxWidth, tabletMaxWidth  } from "../../utils/utils";
import { useIntl } from 'react-intl';

export default function Loader({setMaxHeight, visible}) {

  const showMoreCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < mobileMaxWidth) {
      setMaxHeight(height => height + Math.floor(cardDimensions[320].height*2) + cardDimensions[320].gap*2);
    } else if ((mobileMaxWidth <= width) && (width <= tabletMaxWidth)) {
      setMaxHeight(height => height + Math.floor(cardDimensions[768].height) + cardDimensions[768].gap);
    } else if (width > tabletMaxWidth) {
      setMaxHeight(height => height + Math.floor(cardDimensions[1280].height) + cardDimensions[1280].gap);
    }
  }, [setMaxHeight]);

  const intl = useIntl();

  return (
    <section className={`Loader ${visible ? 'Loader_visible' : ''}`}>
      <button className="Loader__button" onClick={showMoreCards} type="button">
        {intl.formatMessage({id: 'load_more', defaultMessage: 'Ещё'})}
      </button>
    </section>
  );
}
