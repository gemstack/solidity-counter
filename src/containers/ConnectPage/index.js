import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, } from '@material-ui/core';
import Alert from '../../components/Alert';
import history from '../../app/history';
import { ROUTES } from '../../constant';
import { connectMetaMaskRequest } from './reducer';

const styles = () => ({
  root: {
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    minWidth: 275,
  },
});

class ConnectPage extends React.Component {

  componentDidMount() {
    if (!this.props.isMetaMaskConnectRequested) {
      this.props.connectMetaMaskFunc();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMetaMaskConnected !== prevProps.isMetaMaskConnected && this.props.isMetaMaskConnected) {
      history.push(ROUTES.HOMEPAGE);
    }
  }

  render() {
    const { metaMaskConnectionError, classes } = this.props;
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
}

ConnectPage.propTypes = {
  metaMaskConnectionError: PropTypes.string,
  isMetaMaskConnected: PropTypes.bool.isRequired,
  isMetaMaskConnectRequested: PropTypes.bool.isRequired,
  connectMetaMaskFunc: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { metaMaskConnectionError, isMetaMaskConnected, isMetaMaskConnectRequested } = state.metaMask;
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectPage));
