import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';

export default function Landing() {
  return (
    <>
      <Header isLoggedIn={false} />
      <main className="Landing">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
