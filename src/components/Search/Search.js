import { useState } from 'react';

export default function Search({defaultText, defaultShort, handleSearch, }) {
  const [searchField, setSearchField] = useState(defaultText || '');
  const [shortField, setShortField] = useState(defaultShort || false);

  const handleSearchInput = (e) => {
    setSearchField(e.target.value);
  }

  const handleShortSwitch = (e) => {
    setShortField(value => !value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchField, shortField);
  }

  return (
    <section className="Search">
      <form className="Search__form">
        <div className="Search__container">
          <input type="text" placeholder="Фильм" className="Search__input" value={searchField} onChange={handleSearchInput} required />
          <button className="Search__button" onClick={handleSubmit} type="submit"></button>
        </div>
        <div className="Search__label">
          <label htmlFor="switch" className="Search__slider-box">
            <input id="switch" type="checkbox" className="Search__checkbox" checked={shortField} onChange={handleShortSwitch} />
            <span className="Search__slider"></span>
          </label>
          <span className="Search__label-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
