import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthor, setLocation } from '../../store/layoutSlice';

import '../../styles/layout/layout.css';
import { Authors } from '../services/authors.services';
import { Locations } from '../services/locations.services';

const Layout = () => {
  const [text, setText] = useState(''); // состояние ввода в input
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const data = await Authors.getAuthors(); // разделил логику и вынес get запрос в сервис
        dispatch(setAuthor(data));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthorData();
  }, [dispatch]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const data = await Locations.getLocations(); // разделил логику и вынес get запрос в сервис
        dispatch(setLocation(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocationData();
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Filters text={text} handleInput={setText} />
    </div>
  );
};

export default Layout;
