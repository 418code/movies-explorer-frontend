import { AuthContext } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../../utils/api';
import { isTrue, cookieDomain } from '../../utils/utils';

export default function AuthWrapper({children}) {

  const [cookies, setCookie, removeCookie] = useCookies();

  //init checkJWT cookie with correct domain
  useEffect(() => {
    if (!cookies.checkJWT) {
      setCookie('checkJWT', false, { domain: cookieDomain});
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(isTrue(cookies.checkJWT));

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
