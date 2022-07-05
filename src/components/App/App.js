import { useState, useContext, useEffect } from 'react';
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
import { AuthContext } from '../../contexts/AuthContext';
import Private from '../../components/Private/Private';
import moviesApi from '../../utils/moviesApi';
import { transformData, initSaved, isEmpty, filterMovies, preloaderDelay } from '../../utils/utils';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || { name: '', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setupIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [savedMoviesFlags, setSavedMoviesFlags] = useState(JSON.parse(localStorage.getItem('savedMoviesFlags')) || {});
  const [checkedSaved, setCheckedSaved] = useState(JSON.parse(localStorage.getItem('checkedSaved')) || false);
  const [savedSearch, setSavedSearch] = useState(JSON.parse(localStorage.getItem('savedSearch')) || []);
  const [savedShort, setSavedShort] = useState(JSON.parse(localStorage.getItem('savedShort')) || false);
  const [savedText, setSavedText] = useState(JSON.parse(localStorage.getItem('savedText')) || '');
  const [savedPreloaderVisible, setSavedPreloaderVisible ] = useState(false);


  const [currentSearch, setCurrentSearch] = useState(JSON.parse(localStorage.getItem('currentSearch')) || []);
  const [currentShort, setCurrentShort] = useState(JSON.parse(localStorage.getItem('currentShort')) || false);
  const [currentText, setCurrentText] = useState(JSON.parse(localStorage.getItem('currentText')) || '');
  const [currPreloaderVisible, setCurrPreloaderVisible ] = useState(false);

  //update savedMovies localStorage on flag change
  useEffect(() => {
    const result = allMovies.filter(movie => savedMoviesFlags[movie.movieId]);
    localStorage.setItem('savedMovies', JSON.stringify(result));
    localStorage.setItem('savedMoviesFlags', JSON.stringify(savedMoviesFlags));
  }, [savedMoviesFlags, allMovies]);

  //update saved search localStorage data
  useEffect(() => {
    localStorage.setItem('savedSearch', JSON.stringify(savedSearch));
    localStorage.setItem('savedShort', JSON.stringify(savedShort));
    localStorage.setItem('savedText', JSON.stringify(savedText));
  }, [savedSearch, savedShort, savedText]);

  //update current search localStorage data
  useEffect(() => {
    localStorage.setItem('currentSearch', JSON.stringify(currentSearch));
    localStorage.setItem('currentShort', JSON.stringify(currentShort));
    localStorage.setItem('currentText', JSON.stringify(currentText));
  }, [currentSearch, currentShort, currentText]);

  //update current user localStorage data
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  });

  //preload public api data
  useEffect(() => {
    moviesApi()
    .then((movies) => {
      const allMoviesPrep = transformData(movies);
      localStorage.setItem('allMovies', JSON.stringify(allMoviesPrep));
      setAllMovies(allMoviesPrep);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  //wait random time before hiding preloaders
  useEffect(() => {
    const timer = setTimeout(() => setCurrPreloaderVisible(false), preloaderDelay);
    return () => clearTimeout(timer);
  }, [currentSearch]);

  useEffect(() => {
    const timer = setTimeout(() => setSavedPreloaderVisible(false), preloaderDelay);
    return () => clearTimeout(timer);
  }, [savedSearch]);

  const handleCardSave = (card) => {
    if (savedMoviesFlags[card.movieId]) {
      api.deleteCard(savedMoviesFlags[card.movieId])
      .then(res => {
        setSavedMovies(saved => saved.filter(movie => movie.movieId !== card.movieId));
        setSavedSearch(saved => saved.filter(movie => movie.movieId !== card.movieId));
        setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: false});
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      api.saveCard(card)
      .then(movie => {
        setSavedMovies(saved => [...saved, movie]);
        setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: movie._id});
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  const handleCardDelete = (card) => {
    api.deleteCard(savedMoviesFlags[card.movieId])
    .then(res => {
      setSavedMovies(saved => saved.filter(movie => movie.movieId !== card.movieId));
      setSavedSearch(saved => saved.filter(movie => movie.movieId !== card.movieId));
      setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: false});
    })
    .catch(err => {
      console.log(err);
    })
  };

  const menuClickHandler = () => {
    setIsMenuOpen(current => !current);
  };

  const handleRegister = (name, email, password) => {
    api.register({name, email, password})
    .then(res => {
      handleLogin(email, password);
    });
  };

  const handleLogin = (email, password) => {
    api.signIn({ email, password })
    .then(user => {
      setupIsLoggedIn(true);
      setCurrentUser({name: user.data.name, email: user.data.email})
      navigate('/movies');
    })
    .catch(err => {
      console.log(err);
    });
  };

  //exit and cleanup
  const handleLogout = () => {
    setupIsLoggedIn(false);
    setIsMenuOpen(false);
    setSavedMoviesFlags({});
    setSavedMovies([]);
    setCheckedSaved(false);
    setCurrentSearch([]);
    setCurrentShort(false);
    setCurrentText('');
    setSavedSearch([]);
    setSavedShort(false);
    setSavedText('');
    setCurrentUser({name: '', email: ''});
    localStorage.clear();
  };

  const getSavedMovies = () => {
    return api.loadSavedMovies()
    .then((saved) => {
      localStorage.setItem('savedMovies', JSON.stringify(saved));
      setSavedMovies(saved);
      localStorage.setItem('checkedSaved', true);
      setCheckedSaved(true);

      return saved;
    })
    .then((saved) => {
      const flags = initSaved(allMovies, saved);
      localStorage.setItem('savedMoviesFlags', JSON.stringify(flags));
      setSavedMoviesFlags(flags);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleSearch = (searchString, short) => {

    setCurrPreloaderVisible(true);

    //get movies if n/a
    if(isEmpty(savedMovies) && !checkedSaved) {
      getSavedMovies()
      .finally(() => {
        setCurrentSearch(filterMovies(allMovies, searchString, short));
      });
    } else {
      setCurrentSearch(filterMovies(allMovies, searchString, short));
    }
    setCurrentShort(short);
    setCurrentText(searchString);
  };

  const handleSavedSearch = (searchString, short) => {

    setSavedPreloaderVisible(true);

    //get movies if n/a
    if(isEmpty(savedMovies) && !checkedSaved) {
      getSavedMovies()
      .finally(() => {
        setSavedSearch(filterMovies(savedMovies, searchString, short));
      });
    } else {
      setSavedSearch(filterMovies(savedMovies, searchString, short));
    }
    setSavedShort(short);
    setSavedText(searchString);
  };

  const handleProfileUpdate = (name, email) => {
    api.setUserInfo({name, email})
    .then(user => {
      setCurrentUser({name, email});
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body__element">
        <Routes>
          <Route path="/" element={<Landing menuClickHandler={menuClickHandler} />}/>
          <Route path="/signup" element={<Register handleRegister={handleRegister} />}/>
          <Route path="/signin" element={<Login handleLogin={handleLogin} />}/>
          <Route path="/movies" element={
            <Private>
              <Movies menuClickHandler={menuClickHandler} handleSearch={handleSearch}
                      currentSearch={currentSearch} handleCardSave={handleCardSave}
                      currentText={currentText} currentShort={currentShort}
                      savedMoviesFlags={savedMoviesFlags}
                      currPreloaderVisible={currPreloaderVisible} />
            </Private>}/>
          <Route path="/profile" element={
            <Private>
              <Profile menuClickHandler={menuClickHandler} handleLogout={handleLogout} handleProfileUpdate={handleProfileUpdate} />
            </Private>}/>
          <Route path="/saved-movies" element={
            <Private>
              <SavedMovies menuClickHandler={menuClickHandler} handleSearch={handleSavedSearch}
                           handleCardDelete={handleCardDelete}
                           savedMovies={savedMovies} savedMoviesFlags={savedMoviesFlags}
                           savedSearch={savedSearch} savedText={savedText} savedShort={savedShort}
                           savedPreloaderVisible={savedPreloaderVisible} />
            </Private>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
