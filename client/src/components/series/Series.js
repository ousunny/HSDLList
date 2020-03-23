import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { getProfile, getUpdates, removeEpisodes } from '../../actions/profile';

import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Box,
  CircularProgress,
  Checkbox,
  Link
} from '@material-ui/core';
import { Delete, Update } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  icon: {
    padding: '9px'
  }
}));

const Series = ({
  setAlert,
  getProfile,
  getUpdates,
  removeEpisodes,
  profile: { profile, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [selected, setSelected] = React.useState([]);

  const handleDelete = () => {
    removeEpisodes(selected);
  };

  const handleUpdate = () => {
    getUpdates();
  };

  const handleSelect = e => {
    const selectedIndex = selected.indexOf(e.target.value);
    let newSelected = [];

    selectedIndex === -1 &&
      (newSelected = newSelected.concat(selected, e.target.value));

    selectedIndex >= 0 &&
      (newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      ));

    setSelected(newSelected);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton className={classes.icon} onClick={handleDelete}>
                  <Delete />
                </IconButton>
                <IconButton className={classes.icon} onClick={handleUpdate}>
                  <Update />
                </IconButton>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Episode</TableCell>
              <TableCell align="right">Links</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              profile.episodes.map(episode => (
                <TableRow key={episode._id}>
                  <TableCell>
                    <Checkbox
                      onClick={e => handleSelect(e)}
                      value={episode._id}
                    />
                  </TableCell>
                  <TableCell>{episode.title}</TableCell>
                  <TableCell align="right">{episode.episode}</TableCell>
                  <TableCell align="right">
                    {episode.links['720p'].map(link => (
                      <Link key={link._id} href={link.link}>
                        {link.server}
                      </Link>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

Series.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getUpdates: PropTypes.func.isRequired,
  removeEpisodes: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { setAlert, getProfile, getUpdates, removeEpisodes }
)(Series);
