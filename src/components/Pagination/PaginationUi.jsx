import Pagination from '@mui/lab/Pagination';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/PaginationUiSlice';

import '../../styles/pagination/pagination.css';

const PaginationUi = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const handlePageChange = (event, newPage) => {
    dispatch(setPage(newPage));
    console.log(event);
  };

  return (
    <div className="wrapper-pag">
      <Pagination
        className={`${darkTheme ? 'MuiPagination-ul' : 'Light'}`}
        count={3}
        onChange={handlePageChange}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default PaginationUi;
