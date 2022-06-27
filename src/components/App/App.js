import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
import { AuthContext } from '../../contexts/AuthContext';
import Private from '../../components/Private/Private';
import moviesApi from '../../utils/moviesApi';
import { tokenize } from '../../utils/utils';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setupIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState({});
  const [currentSearch, setCurrentSearch] = useState({});

  //preload movie list from api
  useEffect(() => {
    moviesApi()
    .then(data => {
      setAllMovies(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [allMovies]);

  const menuClickHandler = () => {
    setIsMenuOpen(current => !current);
  };

  const onRegister = (name, email, password) => {
    api.register({name, email, password})
    .then(res => {
      navigate('/signin');
    });
  };

  const onLogin = (email, password) => {
    api.signIn({ email, password })
    .then(data => {
      setupIsLoggedIn(true);
      navigate('/movies');
    });
  };

  const onLogout = () => {
    setupIsLoggedIn(false);
  };

  const handleSearch = (searchString, short, changeLoaderVisibility) => {
    const tokens = tokenize(searchString);
    const checker = value =>
      tokens.some(element => value.includes(element));

    setCurrentSearch(allMovies.filter(
      obj => ((tokenize(obj.nameRU).filter(checker).length > 0)
       || (tokenize(obj.nameEN).filter(checker).length > 0))
       && (short ? (parseInt(obj.duration) <= 40) : true)
    ));
  };

  const handleSavedSearch = (searchString) => {

  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body__element">
        <Routes>
          <Route path="/" element={<Landing menuClickHandler={menuClickHandler} />}/>
          <Route path="/signup" element={<Register onRegister={onRegister} />}/>
          <Route path="/signin" element={<Login onLogin={onLogin} />}/>
          <Route path="/movies" element={<Private><Movies menuClickHandler={menuClickHandler} handleSearch={handleSearch} /></Private>}/>
          <Route path="/profile" element={<Private><Profile menuClickHandler={menuClickHandler} onLogout={onLogout} /></Private>}/>
          <Route path="/saved-movies" element={<Private><SavedMovies menuClickHandler={menuClickHandler} handleSearch={handleSavedSearch} /></Private>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
