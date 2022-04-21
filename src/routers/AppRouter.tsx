import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthScreen } from '../components/auth'
import { CalendarScreen } from '../components/calendar'
import { State } from '../state/reducers';
import { startCheckAuth } from '../state/actions/authActions';
import { PublicRoute, PrivateRoute } from '.';

export const AppRouter = () => {
  // hooks
  const { isAuthCheck, user } = useSelector( (state: State) => state.auth );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( startCheckAuth() as any)
  }, [ dispatch ])
  // functions

  // others
  if( !isAuthCheck ) {
    return <h2 style={{ backgroundColor: '#21232a', color: 'azure', height: '100vh'}}> loading...</h2>
  }

  return (
    <Router>
      <Switch>
        <PublicRoute 
          exact
          path="/auth"
          component={ AuthScreen }
          isAuth={ !!user }
        />
        <PrivateRoute 
          path="/"
          component={ CalendarScreen}
          isAuth={ !!user }
        />
      </Switch>
    </Router>
  )
}
