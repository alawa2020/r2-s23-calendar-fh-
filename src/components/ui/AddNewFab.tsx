import React from 'react'
import { useDispatch } from 'react-redux'
import { doCleanActiveEvent, doOpenModal } from '../../state/actions';

export const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    dispatch( doCleanActiveEvent() ); 
    dispatch( doOpenModal() );
  }
  return (
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={ handleAddButtonClick }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
