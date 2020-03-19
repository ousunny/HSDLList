import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { addProfileSeries } from '../../actions/profile';

import { makeStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableRow,
  Typography,
  IconButton,
  CircularProgress,
  TextField
} from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  done: {
    padding: '12px',
    color: 'green'
  },
  row: {
    backgroundColor: green[600]
  }
}));

const ProfileSeriesAddItem = ({ setAlert, addProfileSeries, show }) => {
  const classes = useStyles();

  const [add, setAdd] = React.useState(true);
  const [starting, setStarting] = React.useState(1);

  const onChange = e => {
    setStarting(e.target.value);
  };

  const handleClick = () => {
    setAdd(false);
    addProfileSeries(show.link, starting);
  };

  return (
    <TableRow className={!add ? classes.row : null}>
      <TableCell>{show.title}</TableCell>
      <TableCell align="right">
        <TextField
          disabled={!add}
          label="Starting"
          type="number"
          value={starting}
          onChange={onChange}
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        {add && (
          <IconButton onClick={handleClick}>
            <AddCircleOutline />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

ProfileSeriesAddItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addProfileSeries: PropTypes.func.isRequired,
  show: PropTypes.object.isRequired
};

export default connect(
  null,
  { setAlert, addProfileSeries }
)(ProfileSeriesAddItem);
