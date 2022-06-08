import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';

export default function Landing() {
  return (
    <>
      <Header isLoggedIn={false} />
      <main className="Landing">
        <Hero />
        <About />
        <Tech />
        <Student />
      </main>
      <Footer />
    </>
  );
}
