import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({currentPage,onChangePage}) =>{

    return(
        <>
        <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e)=>onChangePage(e.selected+1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
       
    )
}
export default Pagination;
