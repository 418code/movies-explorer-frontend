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
import { tokenize, transformData, initSaved, syncSavedMovies, isEmpty, filterMovies } from '../../utils/utils';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setupIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [savedMoviesFlags, setSavedMoviesFlags] = useState(JSON.parse(localStorage.getItem('savedMoviesFlags')) || {});
  const [currentSearch, setCurrentSearch] = useState([]);

  //delete movie from savedMovies on flag change
  useEffect(() => {
    syncSavedMovies(savedMovies, savedMoviesFlags);
  }, [savedMoviesFlags, savedMovies]);

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
    })
    .catch(err => {
      console.log(err);
    });
  };

  const onLogout = () => {
    setupIsLoggedIn(false);
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('savedMoviesFlags');
  };

  const handleSearch = (searchString, short, changeLoaderVisibility) => {

    //get movies if n/a
    if(isEmpty(allMovies) || isEmpty(savedMovies) || isEmpty(savedMoviesFlags)) {
      Promise.all([moviesApi(), api.loadSavedMovies()])
      .then(([movies, saved]) => {
        const allMoviesPrep = transformData(movies);
        localStorage.setItem('allMovies', JSON.stringify(allMoviesPrep));
        setAllMovies(allMoviesPrep);

        localStorage.setItem('savedMovies', JSON.stringify(saved));
        setSavedMovies(saved);

        return [allMoviesPrep, saved]
      })
      .then(([movies, saved]) => {
        const flags = initSaved(movies, saved);
        localStorage.setItem('savedMoviesFlags', JSON.stringify(flags));
        setSavedMoviesFlags(flags);
        setCurrentSearch(filterMovies(movies, searchString, short));
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      setCurrentSearch(filterMovies(allMovies, searchString, short));
    }
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
          <Route path="/movies" element={
            <Private>
              <Movies menuClickHandler={menuClickHandler} handleSearch={handleSearch}
                      currentSearch={currentSearch} savedMoviesFlags={savedMoviesFlags}
                      setSavedMoviesFlags={setSavedMoviesFlags} />
            </Private>}/>
          <Route path="/profile" element={
            <Private>
              <Profile menuClickHandler={menuClickHandler} onLogout={onLogout} />
            </Private>}/>
          <Route path="/saved-movies" element={
            <Private>
              <SavedMovies menuClickHandler={menuClickHandler} handleSearch={handleSavedSearch} savedMoviesFlags={savedMoviesFlags} setSavedMoviesFlags={setSavedMoviesFlags} />
            </Private>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
