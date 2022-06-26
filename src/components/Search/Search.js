export default function Search() {
  return (
    <section className="Search">
      <form action="" className="Search__form">
        <div className="Search__container">
          <input type="text" placeholder="Фильм" className="Search__input" required/>
          <button className="Search__button"></button>
        </div>
        <div className="Search__label">
          <label htmlFor="switch" className="Search__slider-box">
            <input id="switch" type="checkbox" className="Search__checkbox"/>
            <span className="Search__slider"></span>
          </label>
          <span className="Search__label-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
