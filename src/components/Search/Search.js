import { useIntl } from "react-intl";
import { useState, useEffect } from "react";

const Search = ({ defaultText, defaultShort, handleSearch, setShort }) => {
  const [searchField, setSearchField] = useState(defaultText || "");
  const [shortField, setShortField] = useState(defaultShort || false);
  const intl = useIntl();

  useEffect(() => {
    setShort(shortField);
  }, [shortField, setShort]);

  const handleSearchInput = (e) => {
    setSearchField(e.target.value);
  };

  const handleShortSwitch = (e) => {
    setShortField((value) => !value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchField, shortField);
  };

  return (
    <section className="Search">
      <form className="Search__form">
        <div className="Search__container">
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "film",
              defaultMessage: "Фильм",
            })}
            className="Search__input"
            value={searchField}
            onChange={handleSearchInput}
            required
          />
          <button
            className="Search__button"
            onClick={handleSubmit}
            aria-label={intl.formatMessage({
              id: "search_btn_aria",
              defaultMessage: "Кнопка поиска",
            })}
            type="submit"
          ></button>
        </div>
        <div className="Search__label">
          <label htmlFor="switch" className="Search__slider-box">
            <input
              id="switch"
              type="checkbox"
              className="Search__checkbox"
              aria-label={intl.formatMessage({
                id: "search_switch_aria",
                defaultMessage: "Фильтр короткометражек",
              })}
              checked={shortField}
              onChange={handleShortSwitch}
            />
            <span className="Search__slider"></span>
          </label>
          <span className="Search__label-text">
            {intl.formatMessage({
              id: "shorts",
              defaultMessage: "Короткометражки",
            })}
          </span>
        </div>
      </form>
    </section>
  );
};

export default Search;
