import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProfileSeries from '../profile/ProfileSeries';
import ProfileSeriesAdd from '../profile/ProfileSeriesAdd';
import Series from '../series/Series';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/series" component={ProfileSeries} />
        <PrivateRoute exact path="/series/add" component={ProfileSeriesAdd} />
        <PrivateRoute exact path="/" component={Series} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
