import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom'

interface Props {
  component: () => JSX.Element;
  isAuth: boolean;
  path?: string;
  exact?: boolean;
}
export const PublicRoute: FC<Props> = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      { ...rest }
      component={ (props: any) => (
        !isAuth
          ? <Component { ...props } />
          : <Redirect to="/" />
      )}
    />
  )
}
