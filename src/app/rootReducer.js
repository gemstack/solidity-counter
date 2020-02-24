import { combineReducers } from 'redux';
import connectPage from '../containers/ConnectPage/reducer';
import homePage from '../containers/Homepage/reducer';

export default combineReducers({ metaMask: connectPage, homePage });
