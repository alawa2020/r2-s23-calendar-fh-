import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthScreen } from '../components/auth'
import { CalendarScreen } from '../components/calendar'
import { State } from '../state/reducers';


export const AppRouter = () => {
  // hooks
  const { isAuthCheck } = useSelector( (state: State) => state.auth );
  // functions

  // others
  // if( !isAuthCheck ) {
  //   return <h2 style={{ backgroundColor: '#21232a', color: 'azure', height: '100vh'}}> loading...</h2>
  // }
  return (
    <Router>
      <Switch>
        <Route 
          exact
          path="/auth"
          component={ AuthScreen }
        />
        <Route 
          path="/"
          component={ CalendarScreen}
        />
      </Switch>
    </Router>
  )
}
