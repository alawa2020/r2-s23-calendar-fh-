import { Dispatch } from 'redux';
import { LoginResponse, RevalidateTokenResponse } from '../../interfaces/responses';
import { fetchWithoutToken, fetchWithToken } from '../../utils/fetch';
/* TYPES */
export type AuthActionType =
  |{ type: '[auth] - Sign in'; payload: { uid: string, name: string, }}
  |{ type: '[auth] - Set auth check'; }

/* SYNCHRONOUS ACTIONS */
const doSignIn = ( uid: string, name: string ): AuthActionType => ({
  type: '[auth] - Sign in',
  payload: {
    uid,
    name,
  }
});

const doSetAuthCheck = (): AuthActionType => ({
  type: '[auth] - Set auth check',
});

/* ASYNCHRONOUS ACTIONS */
// TODO: error al querer obtener tipado en body
// type Login = LoginResponse | BadLoginResponse;
export const startSignIn = ( email: string, password: string ) => {
  return async( dispatch: Dispatch<AuthActionType> ) => {
    try {

      const resp = await fetchWithoutToken( '/auth', { email, password }, 'POST' );
      const body = await resp.json() as LoginResponse;
      console.log(body)

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