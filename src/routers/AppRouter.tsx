import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthScreen } from '../components/auth'
import { CalendarScreen } from '../components/calendar'


export const AppRouter = () => {
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
