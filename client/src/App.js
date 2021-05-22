import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#8792e5',
  },
};

import AppInner from './App_Inner';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppInner />
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
