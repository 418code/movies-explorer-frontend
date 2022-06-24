import { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { api } from '../../utils/api';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = true;
  const navigate = useNavigate();

  const menuClickHandler = () => {
    setIsMenuOpen(current => !current);
  };

  const onRegister = (name, email, password) => {
    api.register({name, email, password})
    .then(res => {
      navigate('/signin');
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body__element">
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/movies" element={<Movies menuClickHandler={menuClickHandler} />}/>
          <Route path="/profile" element={<Profile menuClickHandler={menuClickHandler} />}/>
          <Route path="/saved-movies" element={<SavedMovies menuClickHandler={menuClickHandler} />}/>
          <Route path="/signup" element={<Register onRegister={onRegister} />}/>
          <Route path="/signin" element={<Login />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
