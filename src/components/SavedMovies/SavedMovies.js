import { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';
import SearchNotFound from '../SearchNotFound/SearchNotFound';

export default function SavedMovies ({
  menuClickHandler, handleSearch, savedPreloaderVisible, handleCardDelete,
  savedMoviesFlags, resetSavedSearch, savedSearch, checkedSaved, resetSavedShort, resetSavedText,
  savedShort, setSavedShort,
   }) {

  const {search, shortSearch} = savedSearch;

  //clear saved search on unmount
  useEffect(() => {
    return resetSavedText;
  }, [resetSavedText]);

  useEffect(() => {
    return resetSavedShort;
  }, [resetSavedShort]);

  useEffect(() => {
    return resetSavedSearch;
  }, [resetSavedSearch]);

  useEffect(() => {
      setSavedShort(false);
  }, [setSavedShort]);

  return (
    <>
    <Header menuClickHandler={menuClickHandler} />
    <main className="SavedMovies">
      <Search handleSearch={handleSearch}
        defaultText="" defaultShort={false}
        searchPerformed={checkedSaved}
        setShort={setSavedShort} />
      <Preloader visible={savedPreloaderVisible} />
      <Cards
         cards={savedShort ? shortSearch : search}
         visible={!savedPreloaderVisible && checkedSaved &&
          (savedShort ? shortSearch.length > 0 : search.length > 0)}
         btnType="delete" handleBtnClick={handleCardDelete}
         savedMoviesFlags={savedMoviesFlags} />
      <SearchNotFound visible={!savedPreloaderVisible && checkedSaved &&
        (savedShort ? shortSearch.length === 0 : search.length === 0)}/>
      <section className="SavedMovies__divider">
      </section>
    </main>
    <Footer />
  </>
  );
}
