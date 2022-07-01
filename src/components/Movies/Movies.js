import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {

  return (
    <>
      <Header menuClickHandler={props.menuClickHandler}  />
      <main className="Movies">
        <Search handleSearch={props.handleSearch}
         defaultText={props.currentText}
         defaultShort={props.currentShort} />
        <Preloader visible={props.currPreloaderVisible} />
        <Cards cards={props.currentSearch} visible={!props.currPreloaderVisible}
         btnType="set" handleBtnClick={props.handleCardSave}
         savedMoviesFlags={props.savedMoviesFlags} />
      </main>
      <Footer />
    </>
  );
}
