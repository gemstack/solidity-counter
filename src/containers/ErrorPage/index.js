import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, } from '@material-ui/core';
import Alert from '../../components/Alert';
import history from '../../app/history';
import { ROUTES } from '../../constant';
import { connectMetaMaskRequest } from '../../reducer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    minWidth: 275,
  },
}));

function ErrorPage(props) {
  const classes = useStyles();
  const { metaMaskConnectionError, isMetaMaskConnected, isMetaMaskConnectRequested } = props
  useEffect(() => {
    if (!isMetaMaskConnectRequested) {
      props.connectMetaMaskFunc();
    }
  });

  if (isMetaMaskConnected) {
    history.push(ROUTES.HOMEPAGE);
    return (<div />);
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md={8}>
        <Card className={classes.card}>
          <CardContent>
            {metaMaskConnectionError &&
              <Alert
                type="error"
                message={metaMaskConnectionError}
              />
            }
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  );
}

ErrorPage.propTypes = {
  metaMaskConnectionError: PropTypes.string,
  isMetaMaskConnected: PropTypes.bool.isRequired,
  isMetaMaskConnectRequested: PropTypes.bool.isRequired,
  connectMetaMaskFunc: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { metaMaskConnectionError, isMetaMaskConnected, isMetaMaskConnectRequested } = state;
  return {
    metaMaskConnectionError,
    isMetaMaskConnectRequested,
    isMetaMaskConnected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectMetaMaskFunc: () => dispatch(connectMetaMaskRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
