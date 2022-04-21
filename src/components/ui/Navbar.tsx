import { useDispatch } from 'react-redux'

import { startSignOut } from '../../state/actions';


export const Navbar = () => {

  const dispatch = useDispatch();
  const handleSignOutClick = () => {
    dispatch( startSignOut() as any)
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        Fernando
      </span>
      <button 
        className="btn btn-outline-danger"
        onClick={ handleSignOutClick }
      >
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  )
}
