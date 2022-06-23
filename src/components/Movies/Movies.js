import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  return (
    <>
      <Header isLoggedIn={true}  />
      <main className="Movies">
        <Search />
        <Cards />
        <Loader />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}
