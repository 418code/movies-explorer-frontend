import { useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';
import SearchNotFound from '../SearchNotFound/SearchNotFound';
import { cardDimensions, mobileMaxWidth, tabletMaxWidth } from '../../utils/utils';

export default function Movies(
  {currentSearch, menuClickHandler, handleSearch,
   currentText, currentShort, currPreloaderVisible,
   handleCardSave, savedMoviesFlags, currentSearchMade, setCurrentShort,
   }) {

  const {search, shortSearch} = currentSearch;

  //calculate initial maxHeight for current resolution
  const calcHeight = () => {
    const width = window.innerWidth;

    //calc initila maxHeight for a single resolution
    const calcDimHeight = (width) => {
      return Math.floor(
        cardDimensions[width].height*cardDimensions[width].initialRows) +
        cardDimensions[width].topPad +
        cardDimensions[width].gap*(cardDimensions[width].initialRows - 1);
    };

    if (width < mobileMaxWidth) {
      return calcDimHeight(320);
    } else if ((mobileMaxWidth <= width) && (width <= tabletMaxWidth)) {
      return calcDimHeight(768);
    } else if (width > tabletMaxWidth) {
      return calcDimHeight(1280);
    }
  };


  //calculate height of all cards for this resolution
  const calcTotalHeight = (numCards) => {
    const width = window.innerWidth;

    //calculates max height for 320/768/1280 width and given number of cards
    const calcMaxHeight = (width, numCards) => Math.floor(
      cardDimensions[width].height*Math.floor(numCards)) +
      cardDimensions[width].topPad +
      cardDimensions[width].gap*(Math.floor(numCards)-1);


    if (width < mobileMaxWidth) {
      return calcMaxHeight(320, numCards);
    } else if ((mobileMaxWidth <= width) && (width <= tabletMaxWidth)) {
      return calcMaxHeight(768, numCards / 2);
    } else if (width > tabletMaxWidth) {
      return calcMaxHeight(1280, numCards / 3);
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
         defaultShort={currentShort}
         searchPerformed={currentSearchMade}
         setShort={setCurrentShort} />
        <Preloader visible={currPreloaderVisible} />
        <Cards cards={currentShort ? shortSearch : search}
         btnType="set" handleBtnClick={handleCardSave}
         savedMoviesFlags={savedMoviesFlags}
         maxHeight={maxHeight}
         visible={!currPreloaderVisible && currentSearchMade &&
         (currentShort ? shortSearch.length > 0 : search.length > 0)}/>
        <Loader visible={loaderVisible && !currPreloaderVisible} setMaxHeight={setMaxHeight} />
        <SearchNotFound visible={!currPreloaderVisible && currentSearchMade &&
         (currentShort ? shortSearch.length === 0 : search.length === 0)}/>
      </main>
      <Footer />
    </>
  );
}
