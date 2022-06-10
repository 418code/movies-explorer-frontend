import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';

export default function Movies(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn}  />
      <main className="Movies">
        <Search />
      </main>
      <Footer />
    </>
  );
}
