import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../asstes/logo.png';
import '../../styles/header/header.css';
import { toggleTheme } from '../../store/ThemeSlice';
import lightSun from '../../asstes/LightSun.svg';
import nightSun from '../../asstes/nightSun.svg';

const Header = () => {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  console.log(darkTheme);

  return (
    <div className={`header ${darkTheme ? 'dark' : 'light'}`}>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="header-icon" onClick={handleToggleTheme}>
        {darkTheme ? <img src={lightSun} alt="logo" /> : <img src={nightSun} alt="logo" />}
      </div>
    </div>
  );
};

export default Header;
