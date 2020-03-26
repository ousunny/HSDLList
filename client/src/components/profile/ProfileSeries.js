import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { getProfile, removeProfileSeries } from '../../actions/profile';

import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  CircularProgress,
  Checkbox
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  deleteIcon: {
    padding: '9px'
  }
}));

const ProfileSeries = ({
  setAlert,
  getProfile,
  removeProfileSeries,
  profile: { profile, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [selected, setSelected] = React.useState([]);

  const handleDelete = () => {
    removeProfileSeries(selected);
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
                <IconButton
                  className={classes.deleteIcon}
                  onClick={handleDelete}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Latest episode</TableCell>
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
              profile.series.map(show => (
                <TableRow key={show.showId}>
                  <TableCell>
                    <Checkbox
                      onClick={e => handleSelect(e)}
                      value={show.showId}
                    />
                  </TableCell>
                  <TableCell>{show.title}</TableCell>
                  <TableCell align="right">{show.latest}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

ProfileSeries.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  removeProfileSeries: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { setAlert, getProfile, removeProfileSeries }
)(ProfileSeries);
