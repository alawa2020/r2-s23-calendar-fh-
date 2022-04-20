export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetchWithoutToken = ( endPoint: string, data?: any, method: Method = 'GET' ) => {
  const url: string = `${ process.env.REACT_APP_API_URL }${ endPoint }`;
  if( method === 'GET' ) {
    return fetch( url );
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    });
  }
}

export const fetchWithToken = ( endPoint: string, data?: any, method: Method = 'GET' ) => {
  const url: string = `${ process.env.REACT_APP_API_URL }${ endPoint }`;
  const token: string = localStorage.getItem('calendar-token-r2') || '';

  if( method === 'GET' ) {
    return fetch( url, {
      method,
      headers: {
        'x-token': token,
      }
    });
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify( data ),
    })
  }
}