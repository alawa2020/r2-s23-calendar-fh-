import { UIActionType } from '../actions';


interface UIState {
  isModalOpen: boolean;
}

const initialState: UIState = {
  isModalOpen: false,
}


export const uiReducer = ( state: UIState = initialState, action: UIActionType): UIState => {
  switch ( action.type ) {

    case '[UI] - Open modal':
      return {
        ...state,
        isModalOpen: true,
      }

    case '[UI] - Close modal':
      return {
        ...state,
        isModalOpen: false,
      }
  
    default:
      return state;
  }
  
}