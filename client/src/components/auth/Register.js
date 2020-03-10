import React from 'react';

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

const Register = ({}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h2">Sign up</Typography>
      </div>
      <form className={classes.form}>
        <Grid container className={classes.fields} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="username"
              placeholder="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password"
              placeholder="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password2"
              placeholder="verify password"
              fullWidth
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
              Sign up
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Link href="/login">Already have an account?</Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
