import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const isLoggedIn = true;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body__element">
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/movies" element={<Movies isLoggedIn={isLoggedIn} />}/>
          <Route path="header" element={<Header isLoggedIn={isLoggedIn} />}/>
          <Route path="footer" element={<Footer />}/>
          <Route path="menu" element={<Menu />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;