import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';

export default function Movies(props) {
  return (
    <>
      <Header isLoggedIn={true} menuClickHandler={props.menuClickHandler}  />
      <main className="Movies">
        <Search handleSearch={props.handleSearch} />
      </main>
      <Footer />
    </>
  );
}
