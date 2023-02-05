import React from 'react'
import AppContainer from './Container/AppContainer';
import { getDetails } from './Action/APIAction';
import { store } from './store';
import { Provider } from 'react-redux';
function App() {
  return (
    <React.Fragment>  
      <Provider store={store} dispatch={store.dispatch}>
        <AppContainer 
        />
      </Provider>
    </React.Fragment>
  );
}

export default App