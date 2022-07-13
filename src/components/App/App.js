import { useState, useContext, useEffect, useCallback } from 'react';
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
import { transformData, initSaved, isEmpty, filterMovies, preloaderDelay, popupSetup } from '../../utils/utils';
import Popup from '../Popup/Popup';

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
  const [savedSearch, setSavedSearch] = useState(savedMovies);
  const [savedShort, setSavedShort] = useState(false);
  const [savedText, setSavedText] = useState('');
  const [savedPreloaderVisible, setSavedPreloaderVisible ] = useState(false);

  const [currentSearchMade, setCurrentSearchMade] = useState(JSON.parse(localStorage.getItem('currentSearchMade')) || false);
  const [currentSearch, setCurrentSearch] = useState(JSON.parse(localStorage.getItem('currentSearch')) || []);
  const [currentShort, setCurrentShort] = useState(JSON.parse(localStorage.getItem('currentShort')) || false);
  const [currentText, setCurrentText] = useState(JSON.parse(localStorage.getItem('currentText')) || '');
  const [currPreloaderVisible, setCurrPreloaderVisible ] = useState(false);

  const [popupOpened, setPopupOpened] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  //update savedMovies localStorage on flag change
  useEffect(() => {
    const result = allMovies.filter(movie => savedMoviesFlags[movie.movieId]);
    localStorage.setItem('savedMovies', JSON.stringify(result));
    localStorage.setItem('savedMoviesFlags', JSON.stringify(savedMoviesFlags));
  }, [savedMoviesFlags, allMovies]);

  //remove deleted movie from saved search
  useEffect(() => {
    setSavedSearch(saved => saved.filter(movie =>
       savedMovies.find(saved => movie.movieId === saved.movieId)));
  }, [savedMovies]);

  //update current search localStorage data
  useEffect(() => {
    localStorage.setItem('currentSearch', JSON.stringify(currentSearch));
    localStorage.setItem('currentShort', JSON.stringify(currentShort));
    localStorage.setItem('currentText', JSON.stringify(currentText));
    localStorage.setItem('currentSearchMade', JSON.stringify(currentSearchMade));
  }, [currentSearch, currentShort, currentText, currentSearchMade]);

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
      setPopup(popupSetup.errorMsg, false);
    })
  }, []);

  //wait random time before hiding preloaders
  useEffect(() => {
    const timer = setTimeout(() => setCurrPreloaderVisible(false), preloaderDelay);
    return () => clearTimeout(timer);
  }, [currPreloaderVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setSavedPreloaderVisible(false), preloaderDelay);
    return () => clearTimeout(timer);
  }, [savedPreloaderVisible]);

  const setPopup = (message, sussessful, opened = true) => {
    setPopupOpened(opened);
    setPopupSuccess(sussessful);
    setPopupMessage(message);
  };

  const handleCardSave = (card) => {
    if (savedMoviesFlags[card.movieId]) {
      api.deleteCard(savedMoviesFlags[card.movieId])
      .then(res => {
        setSavedMovies(saved => saved.filter(movie => movie.movieId !== card.movieId));
        setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: false});
      })
      .catch(err => {
        console.log(err);
        setPopup(popupSetup.errorMsg, false);
      })
    } else {
      api.saveCard(card)
      .then(movie => {
        setSavedMovies(saved => [...saved, movie]);
        setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: movie._id});
      })
      .catch(err => {
        console.log(err);
        setPopup(popupSetup.errorMsg, false);
      })
    }
  };

  const handleCardDelete = (card) => {
    api.deleteCard(savedMoviesFlags[card.movieId])
    .then(res => {
      setSavedMovies(saved => saved.filter(movie => movie.movieId !== card.movieId));
      setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: false});
    })
    .catch(err => {
      console.log(err);
      setPopup(popupSetup.errorMsg, false);
    })
  };

  const menuClickHandler = () => {
    setIsMenuOpen(current => !current);
  };

  const handleRegister = (name, email, password) => {
    api.register({name, email, password})
    .then(res => {
      handleLogin(email, password);
    })
    .catch(err => {
      console.log(err);
      setPopup(popupSetup.errorMsg, false);
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
      setPopup(popupSetup.errorMsg, false)
    });
  };

  //exit and cleanup
  const handleLogout = () => {
    setupIsLoggedIn(false);
    setIsMenuOpen(false);
    setSavedMoviesFlags({});
    setSavedMovies([]);
    setCheckedSaved(false);
    setCurrentSearchMade(false);
    setCurrentSearch([]);
    setCurrentShort(false);
    setCurrentText('');
    setSavedSearch([]);
    setSavedShort(false);
    setSavedText('');
    setCurrentUser({name: '', email: ''});
    setPopup('', false, false);
    localStorage.clear();
  };

  const getSavedMovies = () => {
    return api.loadSavedMovies()
    .then((saved) => {
      localStorage.setItem('savedMovies', JSON.stringify(saved));
      setSavedMovies(saved);
      localStorage.setItem('checkedSaved', true);
      setCheckedSaved(true);
      setSavedSearch(saved);

      return saved;
    })
    .then((saved) => {
      const flags = initSaved(allMovies, saved);
      localStorage.setItem('savedMoviesFlags', JSON.stringify(flags));
      setSavedMoviesFlags(flags);
    })
    .catch(err => {
      console.log(err);
      if (JSON.stringify(err).indexOf('404') === -1)
        setPopup(popupSetup.errorMsg, false)
      else {
        setCheckedSaved(true);
        localStorage.setItem('checkedSaved', true);
      }
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
    setCurrentSearchMade(true);
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
  };

  const handleProfileUpdate = (name, email) => {
    api.setUserInfo({name, email})
    .then(user => {
      setCurrentUser({name, email});
      setPopup(popupSetup.profileSuccessMsg, true);
    })
    .catch(err => {
      console.log(err);
      setPopup(popupSetup.errorMsg, false)
    })
  };

  // show all saved movies in search on unmount
  const resetSavedSearch = useCallback(() => {
    setSavedSearch(savedMovies);
  }, [savedMovies, setSavedSearch]);

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
                      currPreloaderVisible={currPreloaderVisible}
                      currentSearchMade={currentSearchMade} />
            </Private>}/>
          <Route path="/profile" element={
            <Private>
              <Profile menuClickHandler={menuClickHandler} handleLogout={handleLogout} handleProfileUpdate={handleProfileUpdate} />
            </Private>}/>
          <Route path="/saved-movies" element={
            <Private>
              <SavedMovies menuClickHandler={menuClickHandler} handleSearch={handleSavedSearch}
                           handleCardDelete={handleCardDelete} savedMoviesFlags={savedMoviesFlags}
                           savedSearch={savedSearch} savedText={savedText} savedShort={savedShort}
                           savedPreloaderVisible={savedPreloaderVisible}
                           resetSavedSearch={resetSavedSearch}
                           checkedSaved={checkedSaved} />
            </Private>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
        <Popup open={popupOpened} onClose={() => { setPopupOpened(false) }}
          successful={popupSuccess} message={popupMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
