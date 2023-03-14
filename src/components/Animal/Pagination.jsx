import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import animalSlice from '../../redux/slice/animal'
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  const dispatch = useDispatch()
  const {currentPage, pageCount } = useSelector((state)=> state.animal)

  const handlePageClick = (selectedPage) => {
    dispatch(animalSlice.actions.setPage(selectedPage.selected + 1))
  }

  return (
    <ReactPaginate
        styles={{display: "flex"}}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName="pagination-container"
        previousLinkClassName="pagination-previous"
        nextLinkClassName="pagination-next"
        activeLinkClassName="pagination-active"
        disabledLinkClassName="pagination-disabled"
        breakLinkClassName="pagination-break"
        pageLinkClassName="pagination-page"
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
      />
  )
}

export default Pagination