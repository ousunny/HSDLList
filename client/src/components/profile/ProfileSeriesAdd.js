import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import {
  getProfile,
  getCurrentSeason,
  getAllShows
} from '../../actions/profile';

import ProfileSeriesAddItem from './ProfileSeriesAddItem';

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
  Tabs,
  Tab,
  Paper,
  Box,
  CircularProgress
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

function TabPanel(props) {
  const { children, value, index, ...others } = props;

  return (
    <Typography component="div" hidden={value !== index} {...others}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  }
}));

const ProfileSeriesAdd = ({
  setAlert,
  getProfile,
  getCurrentSeason,
  getAllShows,
  profile: { current, all, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfile();
    getCurrentSeason();
    getAllShows();
  }, [getProfile, getCurrentSeason, getAllShows]);

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newTab) => {
    newTab === 0 ? getCurrentSeason() : getAllShows();
    setTab(newTab);
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Currently Airing" />
          <Tab label="All Shows" />
        </Tabs>
      </Paper>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <TabPanel value={tab} index={0}>
            <TableContainer>
              <Table>
                <TableBody>
                  {current.map((show, index) => (
                    <ProfileSeriesAddItem key={index} show={show} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <TableContainer>
              <Table>
                <TableBody>
                  {all.map((show, index) => (
                    <ProfileSeriesAddItem key={index} show={show} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileSeriesAdd.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getCurrentSeason: PropTypes.func.isRequired,
  getAllShows: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { setAlert, getProfile, getCurrentSeason, getAllShows }
)(ProfileSeriesAdd);
