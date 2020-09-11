import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px 0px',
  }
}));

function AlertMessage({ type, title, message }) {
  const classes = useStyles();

  return (
    <Alert severity={type} className={classes.root}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  )
}

AlertMessage.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default AlertMessage;
