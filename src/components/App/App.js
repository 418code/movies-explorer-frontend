import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const {isLoggedIn} = true;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body__element">
        <Routes>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
