import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link as MuiLink,
  Button
} from '@material-ui/core';

import { Add, List, Person } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  marginRight: {
    marginRight: theme.spacing(2)
  },
  link: {
    color: 'inherit'
  },
  button: {
    color: 'inherit'
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={props.href} {...props} />
));

const NavBar = ({ auth: { isAuthenticated } }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <MuiLink
            href="/"
            component={CollisionLink}
            className={classes.link}
            style={{ textDecoration: 'none' }}
          >
            HSDLList
          </MuiLink>
        </Typography>
        {isAuthenticated ? (
          <div>
            <IconButton
              href="/series/add"
              component={CollisionLink}
              className={classes.button}
            >
              <Add />
            </IconButton>
            <IconButton
              href="/series"
              component={CollisionLink}
              className={classes.button}
            >
              <List />
            </IconButton>
            <IconButton className={classes.button}>
              <Person />
            </IconButton>
          </div>
        ) : (
          <div>
            <Button
              href="/register"
              component={CollisionLink}
              className={classes.button}
            >
              Register
            </Button>
            <Button
              href="/login"
              component={CollisionLink}
              className={classes.button}
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(NavBar);
