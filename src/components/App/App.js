import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  //context state variables
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const {isLoggedIn} = true;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="*" Element={<Navigate replace to="/" />}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
