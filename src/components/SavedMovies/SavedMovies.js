import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies (props) {

  return (
    <>
    <Header menuClickHandler={props.menuClickHandler} />
    <main className="SavedMovies">
      <Search handleSearch={props.handleSearch} defaultText={props.savedText} defaultShort={props.savedShort} />
      <Preloader visible={props.savedPreloaderVisible} />
      <Cards
         cards={(props.savedText === '' && props.savedShort === false) ?
          props.savedMovies : props.savedSearch} visible={!props.savedPreloaderVisible}
         btnType="delete" handleBtnClick={props.handleCardDelete}
         savedMoviesFlags={props.savedMoviesFlags} />
      <section className="SavedMovies__divider">
      </section>
    </main>
    <Footer />
  </>
  );
}
