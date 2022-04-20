import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';



import { useForm } from '../../hooks';
import { startRegisterUser, startSignIn } from '../../state/actions';


const initialLogin = {
  lEmail: 'fernando@user.com',
  lPassword: '123456',
}
const initialRegister = {
  rName: 'Peter',
  rEmail: 'peter@user.com',
  rPassword1: '123456',
  rPassword2: '123456',
}


export const AuthScreen = () => {

  // hooks
  const { formValues: loginFormValues, handleInputChange: loginHandleInputChange } = useForm( initialLogin);
  const { lEmail, lPassword } = loginFormValues;

  const {formValues: registerFormValues, handleInputChange: registerHandleInputChange } = useForm( initialRegister );
  const { rName, rEmail, rPassword1, rPassword2 } = registerFormValues;

  const dispatch = useDispatch();

  // functions
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: react 18 all dispatchs : any
    dispatch( startSignIn( lEmail, lPassword ) as any);
  }
  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( rPassword1 !== rPassword2 ) {
      alert('passwords are not equals!')
      return;
    }
    dispatch( startRegisterUser( rName, rEmail, rPassword1 ) as any);
  }

  return (
    <div className="container login-container">
      <div className="row">

        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={ handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={ lEmail }
                onChange={ loginHandleInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={ lPassword }
                onChange={ loginHandleInputChange }
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ handleRegisterSubmit }>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={ rName }
                onChange={ registerHandleInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={ rEmail }
                onChange={ registerHandleInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={ rPassword1 }
                onChange={ registerHandleInputChange }
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={ rPassword2 }
                onChange={ registerHandleInputChange }
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
