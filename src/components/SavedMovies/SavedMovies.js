import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';

export default function SavedMovies (props) {
  return (
    <>
    <Header isLoggedIn={true} menuClickHandler={props.menuClickHandler} />
    <main className="SavedMovies">
      <Search />
      <Cards />
      <section className="SavedMovies__divider">
      </section>
    </main>
    <Footer />
  </>
  );
}
