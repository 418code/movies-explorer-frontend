import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import About from '../About/About';

export default function Landing() {
  return (
    <>
      <Header isLoggedIn={false} />
      <main className="Landing">
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}
