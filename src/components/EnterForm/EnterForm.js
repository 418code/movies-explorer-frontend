import logo from '../../images/logo.svg';

export default function EnterForm(props) {
  return (
    <div className="EnterForm">
      <header className="EnterForm__header">
        <img src={logo} alt="логотип" />
        <h1 className="App__header">{props.formHeader}</h1>
      </header>
      <main className="EnterForm__main">
        <form className="EnterForm__form">
          {props.children}
        </form>
      </main>
    </div>
  );
}
