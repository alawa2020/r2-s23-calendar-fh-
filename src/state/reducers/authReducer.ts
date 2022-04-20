import { User } from '../../interfaces';
import { AuthActionType } from '../actions';


interface AuthState {
  isAuthCheck: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthCheck: false,
  user: null,
}


export const authReducer = ( state: AuthState = initialState, action: AuthActionType): AuthState => {
  switch ( action.type ) {

    case '[auth] - Sign in':
      return {
        ...state,
        isAuthCheck: true,
        user: { ...action.payload },
      }
    
    case '[auth] - Set auth check':
      return {
        ...state,
        isAuthCheck: true,
      }
  
    default:
      return state;
  }
  
}