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
import { transformData, initSaved, isEmpty, preloaderDelay, popupSetup, shortMovieMaxLength } from '../../utils/utils';
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
  const [savedSearch, setSavedSearch] = useState({search: [], shortSearch: []});
  const [savedShort, setSavedShort] = useState(false);
  const [savedText, setSavedText] = useState('');
  const [savedPreloaderVisible, setSavedPreloaderVisible ] = useState(false);

  const [currentSearchMade, setCurrentSearchMade] = useState(JSON.parse(localStorage.getItem('currentSearchMade')) || false);
  const [currentSearch, setCurrentSearch] = useState(JSON.parse(localStorage.getItem('currentSearch')) || {search: [], shortSearch: []});
  const [currentShort, setCurrentShort] = useState(JSON.parse(localStorage.getItem('currentShort')) || false);
  const [currentText, setCurrentText] = useState(JSON.parse(localStorage.getItem('currentText')) || '');
  const [currPreloaderVisible, setCurrPreloaderVisible ] = useState(false);

  const [popupContent, setPopupContent] = useState({success: false, message: ''});
  const [popupOpened, setPopupOpened] = useState(false);

  //main search logic
  const filterMovies = useCallback((movies, searchString) => {
    const tokenize = (input) => {
      const initString = input || '';
      return initString.toLowerCase().replace(/[^a-z0-9_а-я\s]/g, '').split(/\s+/g);
    };

    const tokens = tokenize(searchString);
    const checker = value =>
      tokens.some(element => value.includes(element));

    const search = movies.filter((obj) => ((tokenize(obj.nameRU).filter(checker).length > 0) ||
     (tokenize(obj.nameEN).filter(checker).length > 0)));

    const shortSearch =  search.filter(obj => (parseInt(obj.duration) <= shortMovieMaxLength));

    return {search, shortSearch};
  }, []);

  //update savedMovies localStorage on flag change
  useEffect(() => {
    const result = allMovies.filter(movie => savedMoviesFlags[movie.movieId]);
    localStorage.setItem('savedMovies', JSON.stringify(result));
    localStorage.setItem('savedMoviesFlags', JSON.stringify(savedMoviesFlags));
  }, [savedMoviesFlags, allMovies]);

  useEffect(() => {
    localStorage.setItem('checkedSaved', checkedSaved);
  }, [checkedSaved]);

  //remove deleted movie from saved search && init saved search
  useEffect(() => {
    setSavedSearch(filterMovies(savedMovies, savedText));
  }, [savedMovies, savedText, filterMovies]);

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
      showFailPopup();
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

  //make sure icon changes before opening
  useEffect(() => {
    if (popupContent.message !== '')
      setPopupOpened(true);
  }, [popupContent]);

  const showFailPopup = () => {
    setPopupContent({message: popupSetup.errorMsg[currentUser.lang],  success: false});
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
        showFailPopup();
      })
    } else {
      api.saveCard(card)
      .then(movie => {
        setSavedMovies(saved => [...saved, movie]);
        setSavedMoviesFlags({...savedMoviesFlags, [card.movieId]: movie._id});
      })
      .catch(err => {
        console.log(err);
        showFailPopup();
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
      showFailPopup();
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
      showFailPopup();
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
      showFailPopup();
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
    setCurrentSearch({search: [], shortSearch: []});
    setCurrentShort(false);
    setCurrentText('');
    setSavedSearch({search: [], shortSearch: []});
    setSavedShort(false);
    setSavedText('');
    setPopupContent({message: '', success: false});
    setPopupOpened(false);
    localStorage.clear();
  };

  const getSavedMovies = () => {
    return api.loadSavedMovies()
    .then((saved) => {
      setSavedMovies(saved);
      setCheckedSaved(true);
      setSavedMoviesFlags(initSaved(allMovies, saved));
    })
    .catch(err => {
      console.log(err);
      if (JSON.stringify(err).indexOf('404') === -1)
        showFailPopup();
      else {
        setCheckedSaved(true);
      }
    })
  };

  const handleSearch = (searchString, short) => {

    setCurrPreloaderVisible(true);

    //get movies if n/a
    if(isEmpty(savedMovies) && !checkedSaved) {
      getSavedMovies()
      .finally(() => {
        setCurrentSearch(filterMovies(allMovies, searchString));
      });
    } else {
      setCurrentSearch(filterMovies(allMovies, searchString));
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
        setSavedText(searchString);
      });
    } else {
      setSavedText(searchString);
    }
  };

  const handleProfileUpdate = (name, email) => {
    api.setUserInfo({name, email})
    .then(user => {
      setCurrentUser({name, email});
      setPopupContent({message: popupSetup.profileSuccessMsg[currentUser.lang], success: true});
    })
    .catch(err => {
      console.log(err);
      showFailPopup();
    })
  };

  // show all saved movies in search on unmount
  const resetSavedSearch = useCallback(() => {
    setSavedSearch(filterMovies(savedMovies, ''));
  }, [savedMovies, filterMovies]);

  const resetSavedShort = useCallback(() => { setSavedShort(false) }, []);

  const resetSavedText = useCallback(() => { setSavedText('') }, []);

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
                      setCurrentShort={setCurrentShort}
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
                           savedSearch={savedSearch} savedText={savedText} resetSavedShort={resetSavedShort}
                           savedPreloaderVisible={savedPreloaderVisible} resetSavedText={resetSavedText}
                           resetSavedSearch={resetSavedSearch} savedShort={savedShort} setSavedShort={setSavedShort}
                           checkedSaved={checkedSaved}
                           savedMovies={savedMovies}
                           setSavedMovies={setSavedMovies}/>
            </Private>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Menu open={isMenuOpen} menuClickHandler={menuClickHandler} />
          <Popup popupContent={popupContent} isPopupOpened={popupOpened}
           onClose={ () => { setPopupOpened(false)} } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
