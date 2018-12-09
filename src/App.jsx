import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DesignPage from '@/pages/design';

@observer
class App extends React.Component {

  render() {
    return (
      <DesignPage />
    )
  }
}

let ExportedApp = App;

if(module.hot) {
  const { hot } = require('react-hot-loader');
  ExportedApp = hot(module)(App);
}

export default ExportedApp;
