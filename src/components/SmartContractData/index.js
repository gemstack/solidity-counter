import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

function SmartContractData({ totalCount, lastIncrementor, currentAccountIncCount }) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
    >
      <Grid item xs={6}>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          Number stored in contract :
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {totalCount}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          Last incrementor :
      </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {lastIncrementor}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          Increments by currently selected account:
      </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {currentAccountIncCount}
        </Typography>
      </Grid>
    </Grid>
  )
}

SmartContractData.propTypes = {
  totalCount: PropTypes.string,
  lastIncrementor: PropTypes.string,
  currentAccountIncCount: PropTypes.number,
};

export default SmartContractData
