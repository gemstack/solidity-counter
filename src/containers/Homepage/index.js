import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid
} from '@material-ui/core';
import Alert from '../../components/Alert';
import { incCountRequest } from './reducer';
import SmartContractData from '../../components/SmartContractData';

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

function Homepage(props) {
  const {
    totalCount,
    address,
    network,
    classes,
    lastIncrementor,
    incCountRequestFunc,
    incCountReqError,
    incCountReqLoading,
    contractFetchError
  } = props
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
          {contractFetchError ? (
            <CardContent>
              <Alert
                type="error"
                message={contractFetchError}
              />
            </CardContent>
          ) : (
              <CardContent>
                <SmartContractData {...data}
                  isLastIncrementor={!!(address &&
                    lastIncrementor &&
                    lastIncrementor.toLowerCase() === address.toLowerCase())}
                />

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
          }
        </Card>
      </Grid>
    </Grid >
  )
}

Homepage.propTypes = {
  address: PropTypes.string,
  network: PropTypes.string,
  totalCount: PropTypes.string,
  lastIncrementor: PropTypes.string,
  incCountReqError: PropTypes.string,
  incCountReqLoading: PropTypes.bool,
  contractFetchError: PropTypes.string,
  incCountRequestFunc: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { address, network } = state.metaMask;
  const {
    smartContractData,
    incCountReqError,
    incCountReqLoading,
    contractFetchError
  } = state.homePage;
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
    incCountReqLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incCountRequestFunc: (address, network) => dispatch({ type: incCountRequest.type, payload: { address, network } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Homepage));
