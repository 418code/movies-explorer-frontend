import { useEffect, createRef } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';
import SearchNotFound from '../SearchNotFound/SearchNotFound';

export default function SavedMovies ({
  menuClickHandler, handleSearch, savedPreloaderVisible, handleCardDelete,
  savedMoviesFlags, savedSearch, resetSavedSearch, checkedSaved,
   }) {

  const searchInputRef = createRef();
  const searchSwitchRef = createRef();

  const ref = {searchInputRef, searchSwitchRef};

  //clear saved search on mount
  useEffect(() => {
    if (searchInputRef.current.value === '' && searchSwitchRef.current.checked === false)
      resetSavedSearch();
  }, [resetSavedSearch, searchInputRef, searchSwitchRef]);

  return (
    <>
    <Header menuClickHandler={menuClickHandler} />
    <main className="SavedMovies">
      <Search ref={ref} handleSearch={handleSearch} defaultText="" defaultShort={false} />
      <Preloader visible={savedPreloaderVisible} />
      <Cards
         cards={savedSearch} visible={!savedPreloaderVisible && checkedSaved && savedSearch.length > 0}
         btnType="delete" handleBtnClick={handleCardDelete}
         savedMoviesFlags={savedMoviesFlags} />
      <SearchNotFound visible={!savedPreloaderVisible && checkedSaved && savedSearch.length === 0} />
      <section className="SavedMovies__divider">
      </section>
    </main>
    <Footer />
  </>
  );
}
