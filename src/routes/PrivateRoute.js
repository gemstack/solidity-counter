import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from '../constant';

function PrivateRoute({ component: Component, isMetaMaskConnected, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isMetaMaskConnected ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: ROUTES.CONNECT_PAGE,
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    isMetaMaskConnected: state.metaMask.isMetaMaskConnected,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
