import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';
import { api } from '../../utils/api';

export default function Movies(props) {

  const [cardsVisible, setCardsVisible] = useState(true);

  const handleCardSave = (card) => {
    if (props.savedMoviesFlags[card.movieId]) {
      api.deleteCard(props.savedMoviesFlags[card.movieId])
      .then(res => {
        props.setSavedMoviesFlags({...props.savedMoviesFlags, [card.movieId]: false});
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      api.saveCard(card)
      .then(movie => {
        props.setSavedMoviesFlags({...props.savedMoviesFlags, [card.movieId]: movie._id});
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  return (
    <>
      <Header isLoggedIn={true} menuClickHandler={props.menuClickHandler}  />
      <main className="Movies">
        <Search handleSearch={props.handleSearch} />
        <Cards cards={props.currentSearch} visible={cardsVisible}
         btnType="set" handleBtnClick={handleCardSave}
         savedMoviesFlags={props.savedMoviesFlags} />
      </main>
      <Footer />
    </>
  );
}
