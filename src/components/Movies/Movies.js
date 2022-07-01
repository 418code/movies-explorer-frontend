import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';

export default function Movies(props) {

  const [cardsVisible, setCardsVisible] = useState(true);

  return (
    <>
      <Header menuClickHandler={props.menuClickHandler}  />
      <main className="Movies">
        <Search handleSearch={props.handleSearch} defaultText={props.currentText} defaultShort={props.currentShort} />
        <Cards cards={props.currentSearch} visible={cardsVisible}
         btnType="set" handleBtnClick={props.handleCardSave}
         savedMoviesFlags={props.savedMoviesFlags} />
      </main>
      <Footer />
    </>
  );
}
