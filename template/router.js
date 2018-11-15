/**
 * 路由配置
 */
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import App from './src/components/App';
import NotFound from './src/components/NotFound';
import Dashboard from './src/pages/Dashboard';
import Overview from './src/pages/Overview';

export default render((
  <Router>
    <App>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Redirect from="/" to="/dashboard" />
          )}
        />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/overview' component={Overview} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

