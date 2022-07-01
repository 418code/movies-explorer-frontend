import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';

export default function SavedMovies (props) {

  const [cardsVisible, setCardsVisible] = useState(true);

  return (
    <>
    <Header menuClickHandler={props.menuClickHandler} />
    <main className="SavedMovies">
      <Search handleSearch={props.handleSearch} defaultText={props.savedText} defaultShort={props.savedShort} />
      <Cards
         cards={(props.savedText === '' && props.savedShort === false) ? props.savedMovies : props.savedSearch} visible={cardsVisible}
         btnType="delete" handleBtnClick={props.handleCardDelete}
         savedMoviesFlags={props.savedMoviesFlags} />
      <section className="SavedMovies__divider">
      </section>
    </main>
    <Footer />
  </>
  );
}
