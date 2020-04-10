import React, { Fragment, useEffect } from 'react';
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
  Checkbox,
  Backdrop
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  deleteIcon: {
    padding: '9px'
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    color: '#fff'
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
    setSelected([]);
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

  const handleSelectAll = e => {
    console.log(selected);
    if (e.target.checked) {
      const newSelecteds = profile.series.map(show => show.showId);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Fragment>
      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < profile.series.length
                      }
                      checked={
                        profile.series.length > 0 &&
                        selected.length === profile.series.length
                      }
                      onChange={e => handleSelectAll(e)}
                    />
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
                {profile.series.map(show => (
                  <TableRow
                    hover
                    key={show.showId}
                    selected={isSelected(show.showId)}
                  >
                    <TableCell>
                      <Checkbox
                        onClick={e => handleSelect(e)}
                        value={show.showId}
                        checked={isSelected(show.showId)}
                      />
                    </TableCell>
                    <TableCell>{show.title}</TableCell>
                    <TableCell align="right">{show.latest}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Fragment>
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
