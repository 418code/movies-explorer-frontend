import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../images/logo.svg';

export default function EnterForm(props) {

  const { isLoggedIn } = useContext(AuthContext);
  const intl = useIntl();

  return isLoggedIn ?
      <Navigate to="/" />
    :
    (
      <div className="EnterForm">
        <header className="EnterForm__header">
          <Link to="/">
            <img src={logo} alt={intl.formatMessage({id: 'logo', defaultMessage: 'логотип'})} />
          </Link>
          <h1 className="App__header">{props.formHeader}</h1>
        </header>
        <main className="EnterForm__main">
          <form className="EnterForm__form" onSubmit={props.onSubmit}>
            {props.children}
          </form>
        </main>
      </div>
    );
}
