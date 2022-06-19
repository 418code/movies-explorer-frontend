import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';

export default function Movies() {
  return (
    <>
      <Header isLoggedIn={true}  />
      <main className="Movies">
        <Search />
        <Cards />
        <Loader />
      </main>
      <Footer />
    </>
  );
}
