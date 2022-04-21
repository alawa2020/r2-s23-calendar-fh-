import { Dispatch } from 'redux';
import { LoginResponse, RegisterUserResponse, RevalidateTokenResponse } from '../../interfaces/responses';
import { fetchWithoutToken, fetchWithToken } from '../../utils/fetch';
/* TYPES */
export type AuthActionType =
  |{ type: '[auth] - Sign in'; payload: { uid: string, name: string, }}
  |{ type: '[auth] - Sign out'; }
  |{ type: '[auth] - Set auth check'; }

/* SYNCHRONOUS ACTIONS */
const doSignIn = ( uid: string, name: string ): AuthActionType => ({
  type: '[auth] - Sign in',
  payload: {
    uid,
    name,
  }
});

const doSignOut = (): AuthActionType => ({
  type: '[auth] - Sign out',
});

const doSetAuthCheck = (): AuthActionType => ({
  type: '[auth] - Set auth check',
});

/* ASYNCHRONOUS ACTIONS */
export const startCheckAuth = () => {
  return async( dispatch: Dispatch ) => {
    try {
      const resp = await fetchWithToken( '/auth/renew');
      const body = await resp.json() as RevalidateTokenResponse;
      if( body.ok ) {
        localStorage.setItem('calendar-token-r2', body.token );
        dispatch( doSignIn( body.uid, body.name ));
      } else {
        dispatch( doSetAuthCheck() );
      }
    } catch (err) {
      
    }
  }
}

// TODO: error al querer obtener tipado en body
// type Login = LoginResponse | BadLoginResponse;
export const startSignIn = ( email: string, password: string ) => {
  return async( dispatch: Dispatch<AuthActionType> ) => {
    try {

      const resp = await fetchWithoutToken( '/auth', { email, password }, 'POST' );
      const body = await resp.json() as LoginResponse;

      if( body.ok) {
        localStorage.setItem('calendar-token-r2', body.token );
        dispatch( doSignIn( body.uid, body.name ))
      } else {
        alert( body.msg );
      }
    } catch (err) {
      console.log(err)
      alert('something went wrong!');
    }
  }
}

export const startRegisterUser = ( name: string, email: string, password: string) => {
  return async( dispatch: Dispatch ) => {
    try {

      const resp = await fetchWithoutToken( '/auth/new', {name, email, password }, 'POST' );
      const body: RegisterUserResponse = await resp.json();

      if( body.ok ) {
        localStorage.setItem('calendar-token-r2', body.token );
        dispatch( doSignIn( body.uid, body.name ));
      } else {
        alert( body.msg );
      }

    } catch (err) {
      console.log(err)
      alert('something went wrong')
    }
  }
}

export const startSignOut = () => {
  return ( dispatch: Dispatch ) => {
    localStorage.removeItem('calendar-token-r2');
    dispatch( doSignOut() );
  }
}