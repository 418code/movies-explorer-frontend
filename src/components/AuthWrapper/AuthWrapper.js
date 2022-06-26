import { AuthContext } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { api } from '../../utils/api';
import { isTrue } from '../../utils/utils';

export default function AuthWrapper({children}) {

  const [cookies, removeCookie] = useCookies(['checkJWT']);
  const [isLoggedIn, setIsLoggedIn] = useState(isTrue(cookies.checkJWT));
  const navigate = useNavigate();

  // check httpOnly cookie
  useEffect(() => {
      api.getUserInfo()
      .catch(err => {
        if (JSON.stringify(err).indexOf('401') !== -1)
          setIsLoggedIn(false);
        console.log(err);
      });
    }, [isLoggedIn]);

  //signout
  useEffect(() => {
    if (!isLoggedIn) {
      removeCookie('checkJWT');
      api.signOut()
      .catch(err => {
        console.log(err);
      });
    }
  }, [isLoggedIn, removeCookie]);

  function toggle (value) {
    setIsLoggedIn(value);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, setupIsLoggedIn: toggle }}>
      {children}
    </AuthContext.Provider>
  );
}
