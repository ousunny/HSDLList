import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '550px',
    margin: '0 auto'
  },
  heading: {
    padding: '2rem',
    width: '100%',
    textAlign: 'center'
  },
  form: {
    margin: '0 auto',
    padding: '1rem',
    width: '50%'
  },
  fields: {},
  buttonFullWidth: {
    width: '100%'
  },
  center: {
    textAlign: 'center'
  }
}));

const Login = ({ login, auth: { isAuthenticated, user, loading } }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h2">Sign in</Typography>
      </div>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <Grid container className={classes.fields} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="username"
              placeholder="username"
              fullWidth
              value={username}
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="password"
              name="password"
              placeholder="password"
              fullWidth
              value={password}
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.buttonFullWidth}
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Sign in
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Link href="/register">Don't have an account? Click here!</Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
