import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { connect } from "react-redux";
import { getNetworkName } from '../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  details: {
    fontWeight: 700,
    fontSize: 9,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
  }
}));

function Header({ address, network }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Home />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Dapp
          </Typography>
          <div>
            <Typography variant="subtitle2" className={classes.details}>
              Address: {address}
            </Typography>
            <Typography variant="subtitle2" className={classes.details}>
              Network: {getNetworkName(network)}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  address: PropTypes.string,
  network: PropTypes.string,
};

const mapStateToProps = state => {
  const { address, network } = state.metaMask;
  return {
    address,
    network,
  };
};

export default connect(mapStateToProps)(Header);
