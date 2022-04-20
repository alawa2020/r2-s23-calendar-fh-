import { Provider } from 'react-redux';

import { AppRouter } from './routers';
import { store } from './state/store/store';


const App = () => {
  return (
    <>
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
