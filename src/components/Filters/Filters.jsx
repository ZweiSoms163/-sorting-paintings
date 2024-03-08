import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAuthor, setSelectedLocation } from '../../store/FiltersSlice';

import '../../styles/filters/filters.css';
import Content from '../Content/Content';
import FiltersCreated from '../FiltersCreated/FiltersCreated';

const Filters = ({ text, handleInput }) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const author = useSelector((state) => state.layout.author);
  const location = useSelector((state) => state.layout.location);

  const [isClearable] = useState(true);
  const [isSearchable] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSelectChangeAuthor = (option) => {
    if (option) {
      dispatch(setSelectedAuthor(option));
    } else {
      dispatch(setSelectedAuthor(''));
    }
  };

  const handleSelectChangeLocation = (option) => {
    if (option) {
      dispatch(setSelectedLocation(option));
    } else {
      dispatch(setSelectedLocation(''));
    }
  };

  const optionsAuthor = author.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const optionsLocation = location.map((data) => ({
    value: data.id,
    label: data.location,
  }));

  const selectClassNamePrefix = darkTheme ? 'custom-select' : 'custom-selectLight';

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    clearTimeout(debounceTimer);

    const newDebounceTimer = setTimeout(() => {
      handleInput(newValue);
    }, 300);

    setDebounceTimer(newDebounceTimer);
  };

  return (
    <div className="wrapper">
      <div className="search">
        <input
          onChange={handleInputChange}
          value={inputValue}
          className={`search-input ${darkTheme ? 'dark' : 'light'}`}
          placeholder="Name"
        />
        <Select
          defaultValue=""
          onChange={handleSelectChangeAuthor}
          isClearable={isClearable}
          options={optionsAuthor}
          isSearchable={isSearchable}
          placeholder="Author"
          className={`search-select ${darkTheme ? 'dark' : 'light'}`}
          classNamePrefix={selectClassNamePrefix}
        />

        <Select
          onChange={handleSelectChangeLocation}
          isClearable={isClearable}
          options={optionsLocation}
          isSearchable={isSearchable}
          placeholder="Location"
          className={`search-select ${darkTheme ? 'dark' : 'light'}`}
          classNamePrefix={selectClassNamePrefix}
        />
        <FiltersCreated />
      </div>
      <div className="content">
        <Content text={text} />
      </div>
    </div>
  );
};

export default Filters;
