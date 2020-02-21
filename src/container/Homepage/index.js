import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardHeader, CardContent, CardActions, Grid } from '@material-ui/core';
import Alert from './../../components/Alert';
import { connectMetaMask, incCountRequest } from '../../action';
import SmartContractData from './../../components/SmartContractData';

const styles = () => ({
  root: {
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    minWidth: 275,
  },
  alignCenter: {
    margin: '0px auto'
  }
});

class Homepage extends React.Component {
  componentDidMount() {
    this.props.connectMetaMaskFunc();
  }
  render() {
    const {
      totalCount,
      address,
      network,
      classes,
      lastIncrementor,
      incCountRequestFunc,
      incCountReqError,
      incCountReqLoading,
      isMetaMaskConnected,
      metaMaskConnectionError,
      contractFetchError
    } = this.props
    const currentAccountIncCount = parseInt(localStorage.getItem(address) || 0);
    const data = {
      totalCount,
      lastIncrementor,
      currentAccountIncCount,
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
            <CardHeader title={'Increment Contract'} />
            {isMetaMaskConnected ?
              (contractFetchError ? (
                <CardContent>
                  <Alert
                    type="info"
                    message={contractFetchError}
                  />
                </CardContent>
              ) : (
                  <CardContent>
                    <SmartContractData {...data} />
                    {(address &&
                      lastIncrementor &&
                      lastIncrementor.toLowerCase() === address.toLowerCase()) ?
                      <Alert
                        type="info"
                        message="You have done last increment."
                      /> : null
                    }

                    {address &&
                      <>
                        <CardActions>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.alignCenter}
                            disabled={incCountReqLoading}
                            onClick={() => incCountRequestFunc(address, network)}
                          >
                            Increment
                          </Button>
                        </CardActions>
                        {incCountReqError &&
                          <Alert
                            type="error"
                            message={incCountReqError}
                          />
                        }
                      </>
                    }
                  </CardContent>
                )
              ) : (
                <CardContent>
                  {metaMaskConnectionError &&
                    <Alert
                      type="error"
                      message={metaMaskConnectionError}
                    />
                  }
                </CardContent>
              )
            }
          </Card>
        </Grid>
      </Grid >
    )
  }
}

Homepage.propTypes = {
  address: PropTypes.string,
  network: PropTypes.string,
  totalCount: PropTypes.string,
  lastIncrementor: PropTypes.string,
  incCountReqError: PropTypes.string,
  incCountReqLoading: PropTypes.bool,
  contractFetchError: PropTypes.string,
  connectMetaMaskFunc: PropTypes.func.isRequired,
  incCountRequestFunc: PropTypes.func.isRequired,
  isMetaMaskConnected: PropTypes.bool.isRequired,
  metaMaskConnectionError: PropTypes.string,
};

const mapStateToProps = state => {
  const {
    smartContractData,
    address,
    network,
    incCountReqError,
    metaMaskConnectionError,
    isMetaMaskConnected,
    incCountReqLoading,
    contractFetchError
  } = state;
  const {
    totalCount,
    lastIncrementor,
  } = smartContractData;
  return {
    address,
    network,
    totalCount,
    lastIncrementor,
    contractFetchError,
    incCountReqError,
    isMetaMaskConnected,
    incCountReqLoading,
    metaMaskConnectionError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectMetaMaskFunc: () => dispatch(connectMetaMask()),
    incCountRequestFunc: (address, network) => dispatch(incCountRequest(address, network))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Homepage));
