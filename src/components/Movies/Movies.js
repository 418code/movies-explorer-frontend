import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';
import { cardDimensions } from '../../utils/utils';

export default function Movies(
  {currentSearch, menuClickHandler, handleSearch,
   currentText, currentShort, currPreloaderVisible,
   handleCardSave, savedMoviesFlags}) {

  //calculate initial maxHeight for current resolution
  const calcHeight = () => {
    const width = window.innerWidth;
    if (width < 635) {
      return Math.floor(cardDimensions[320].height*5) + cardDimensions[320].topPad + cardDimensions[320].gap*4;
    } else if ((635 <= width) && (width <= 1136)) {
      return Math.floor(cardDimensions[768].height*4) + cardDimensions[768].topPad + cardDimensions[768].gap*3;
    } else if (width > 1136) {
      return cardDimensions[1280].height*4 + cardDimensions[1280].topPad + cardDimensions[1280].gap*3;
    }
  };

  //calculate height of all cards for this resolution
  const calcTotalHeight = (numCards) => {
    const width = window.innerWidth;
    if (width < 635) {
      return Math.floor(cardDimensions[320].height*numCards) +
        cardDimensions[320].topPad + cardDimensions[320].gap*(numCards-1);
    } else if ((635 <= width) && (width <= 1136)) {
      return Math.floor(cardDimensions[768].height*(Math.floor(numCards / 2))) +
        cardDimensions[768].topPad + cardDimensions[768].gap*(Math.floor(numCards / 2)-1);
    } else if (width > 1136) {
      return cardDimensions[1280].height*(Math.floor(numCards / 3)) +
        cardDimensions[1280].topPad + cardDimensions[1280].gap*(Math.floor(numCards / 3)-1);
    }
  };

  const [maxHeight, setMaxHeight] = useState(calcHeight);
  const [loaderVisible, setLoaderVisible] = useState(true);

  //reset maxHeight on search
  useEffect(() => {
    setMaxHeight(calcHeight());
  }, [currentSearch]);

  //hide loader when all cards visible
  useEffect(() =>{
    const totalHeight = calcTotalHeight(currentSearch.length);
    setLoaderVisible(maxHeight < totalHeight);
  }, [maxHeight, currentSearch]);


  //set initial maxHeight on resize
  useEffect(() => {
      const updateDimensions = () => {
        setMaxHeight(calcHeight);
      }

      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <Header menuClickHandler={menuClickHandler}  />
      <main className="Movies">
        <Search handleSearch={handleSearch}
         defaultText={currentText}
         defaultShort={currentShort} />
        <Preloader visible={currPreloaderVisible} />
        <Cards cards={currentSearch} visible={!currPreloaderVisible}
         btnType="set" handleBtnClick={handleCardSave}
         savedMoviesFlags={savedMoviesFlags}
         maxHeight={maxHeight} />
        <Loader visible={loaderVisible && !currPreloaderVisible} setMaxHeight={setMaxHeight} />
      </main>
      <Footer />
    </>
  );
}
