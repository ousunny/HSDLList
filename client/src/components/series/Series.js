import React, { Fragment, useEffect } from 'react';
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
  CircularProgress,
  Checkbox,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Backdrop
} from '@material-ui/core';
import { Delete, Update } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  icon: {
    padding: '9px'
  },
  textfield: {
    width: '100%'
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    color: '#fff'
  }
}));

const Series = ({
  setAlert,
  getProfile,
  getUpdates,
  removeEpisodes,
  profile: { profile, loading, isFetching }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [selected, setSelected] = React.useState([]);

  const handleDelete = () => {
    removeEpisodes(selected);
    setSelected([]);
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

  const updateMagnetBlock = () => {
    let magnetBlock = '';

    profile.episodes.map(episode =>
      episode.links['720p'].map(
        link => (magnetBlock = magnetBlock.concat(`${link.link}\n`))
      )
    );

    return magnetBlock;
  };

  const handleSelectAll = e => {
    if (e.target.checked) {
      const newSelecteds = profile.episodes.map(episode => episode._id);
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
                        selected.length < profile.episodes.length
                      }
                      checked={
                        profile.episodes.length > 0 &&
                        selected.length === profile.episodes.length
                      }
                      onChange={e => handleSelectAll(e)}
                    />
                    <IconButton className={classes.icon} onClick={handleDelete}>
                      <Delete />
                    </IconButton>
                    <IconButton
                      className={classes.icon}
                      onClick={handleUpdate}
                      disabled={isFetching}
                    >
                      {isFetching ? (
                        <CircularProgress size="24px" />
                      ) : (
                        <Update />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Episode</TableCell>
                  <TableCell align="right">Links</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {profile.episodes.map(episode => (
                  <TableRow
                    hover
                    key={episode._id}
                    selected={isSelected(episode._id)}
                  >
                    <TableCell>
                      <Checkbox
                        onClick={e => handleSelect(e)}
                        value={episode._id}
                        checked={isSelected(episode._id)}
                      />
                    </TableCell>
                    <TableCell>{episode.title}</TableCell>
                    <TableCell align="right">{episode.episode}</TableCell>
                    <TableCell align="right">
                      {episode.links['720p'].map(link => (
                        <Link key={link._id} href={link.link}>
                          720p-{link.server}
                        </Link>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ExpansionPanel expanded>
            <ExpansionPanelSummary>
              <Typography>All Magnets</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                multiline
                InputLabelProps={{ readOnly: true }}
                value={updateMagnetBlock()}
                onClick={e => {
                  e.target.focus();
                  e.target.select();
                }}
                className={classes.textfield}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      )}
    </Fragment>
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
