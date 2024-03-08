import React, { useEffect, useState } from 'react';
import '../../styles/content/content.css';
import axios from 'axios';
import PaginationUi from '../Pagination/PaginationUi';

import { useSelector } from 'react-redux';

const Content = ({ text }) => {
  const [appState, setAppState] = useState([]);
  const author = useSelector((state) => state.layout.author);
  const location = useSelector((state) => state.layout.location);

  const selectedLocation = useSelector((state) => state.filters.selectedLocation);
  const selectedAuthor = useSelector((state) => state.filters.selectedAuthor);

  const setInputFrom = useSelector((state) => state.filters.inputFrom);
  const setInputBefore = useSelector((state) => state.filters.inputBefore);

  const page = useSelector((state) => state.pagination.page);

  const instance = axios.create({
    baseURL: 'https://test-front.framework.team', // базовый URL
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = [
          { key: 'authorId', value: selectedAuthor.value },
          { key: 'locationId', value: selectedLocation.value },
          { key: 'created_gte', value: setInputFrom },
          { key: 'created_lte', value: setInputBefore },
          { key: '_page', value: page },
        ];

        let url = `https://test-front.framework.team/paintings?q=${text}&_limit=12`;

        filters.forEach((filter) => {
          if (filter.value) {
            url += `&${filter.key}=${filter.value}`;
          }
        });
        console.log(url);

        const response = await instance.get(url);
        const allInfo = response.data;

        setAppState(allInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [text, selectedAuthor, selectedLocation, setInputFrom, setInputBefore, page]);

  return (
    <div className="wrapper">
      <div className="content">
        {appState.length === 0 ? (
          <div>Loading...</div>
        ) : (
          appState.map((state) => (
            <div key={state.id} className="content-box">
              <img
                alt={state.name}
                className="content-img"
                src={`https://test-front.framework.team/${state.imageUrl}`}
              />
              <div className="content-info">
                <div className="content-name">{state.name}</div>
                <div className="content-img_info">
                  <span className="content-img-text">Author: </span>
                  <span className="content-img-name">
                    {author.find((a) => a.id === state.authorId)?.name}
                  </span>
                  {/* добовляю в массив appState поиск по массиву author для отображения имени автора  */}
                </div>
                <div className="content-img_info">
                  <span className="content-img-text">Created: </span>
                  {state.created}
                </div>
                <div className="content-img_info">
                  <span className="content-img-text">Location: </span>
                  <span className="content-img-name">
                    {location.find((a) => a.id === state.locationId)?.location}
                  </span>
                  {/* добовляю в массив appState поиск по массиву author для отображения имени локации  */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PaginationUi />
    </div>
  );
};

export default Content;
