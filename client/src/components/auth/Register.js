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
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Register = ({}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>
        <Typography variant="h2">Sign up</Typography>
      </div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField required name="username" placeholder="username" />
          </Grid>
          <Grid item xs={12}>
            <TextField required name="password" placeholder="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="password2"
              placeholder="verify password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Sign up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link href="/login">Already have an account?</Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
