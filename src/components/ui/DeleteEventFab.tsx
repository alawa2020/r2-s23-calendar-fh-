import { useDispatch, useSelector } from "react-redux";

import { doCleanActiveEvent, doDeleteEvent } from "../../state/actions";
import { State } from "../../state/reducers";


export const DeleteEventFab = () => {

  const { activeEvent } = useSelector( (state: State) => state.events );
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    if( activeEvent ) {
      dispatch( doDeleteEvent( activeEvent._id ));
      dispatch( doCleanActiveEvent() );
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
