import { useDispatch, useSelector } from "react-redux";

import { startDeleteEvent } from "../../state/actions";
import { State } from "../../state/reducers";


export const DeleteEventFab = () => {

  const { activeEvent } = useSelector( (state: State) => state.events );
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    if( activeEvent ) {
      if( window.confirm('Are you sure') ) {
        dispatch( startDeleteEvent( activeEvent._id ) as any);
      }
    }
  }
  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={ handleDeleteClick }
    >
      Delete
    </button>
  )
}
