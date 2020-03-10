import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
