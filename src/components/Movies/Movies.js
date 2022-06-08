import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Movies(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn}  />
      <main className="Movies">

      </main>
      <Footer />
    </>
  );
}
