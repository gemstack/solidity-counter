import { call, put, takeLatest, fork, take } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import { CONTRACT_ADDRESS } from './../constant';
import {
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
  getContractDataRequest,
  getContractDataSuccess,
  getContractDataFailure,
  incCountRequest,
  incCountSuccess,
  incCountFailure
} from './../reducer';
import { getContractData, incrementVar } from "../services/contract";
import connectToMetaMask, { onAccountChanged } from '../services/connectToMetamask';

function* connect() {
  try {
    const data = yield call(connectToMetaMask);
    if (data && data.address && data.network) {
      yield put({ type: connectMetaMaskSuccess.type, payload: { ...data } });
      yield put({ type: getContractDataRequest.type, payload: { ...data } });
      // event to check address change
      yield fork(watchAccountChange);
    } else {
      yield put({ type: connectMetaMaskFailure.type, payload: 'No data found' });
    }
  } catch (e) {
    yield put({ type: connectMetaMaskFailure.type, payload: e.message });
    console.log(e);
  }
}

function* fetchContractData(action) {
  try {
    const { network } = action.payload;
    const contractAddress = CONTRACT_ADDRESS[network];
    if (!contractAddress) throw new Error('Contract address not available.');
    const data = yield call(getContractData, contractAddress);
    if (data) {
      yield put({ type: getContractDataSuccess.type, payload: { ...data } });
    }
  } catch (e) {
    yield put({ type: getContractDataFailure.type, payload: e.message });
    console.log(e);
  }
}

function* incrementCount(action) {
  try {
    const { address, network } = action.payload;
    const contractAddress = CONTRACT_ADDRESS[network];
    if (!contractAddress) throw new Error('Contract address not available.');
    const data = yield call(incrementVar, address, contractAddress);
    let count = parseInt(localStorage.getItem(action.payload) || 0);
    yield call(fetchContractData, action)
    localStorage.setItem(action.payload, ++count);
    yield put({ type: incCountSuccess.type, payload: { ...data } });
  } catch (e) {
    yield put({ type: incCountFailure.type, payload: e.message });
    console.log(e);
  }
}

function handelAccountChanged() {
  return eventChannel(emit => {
    onAccountChanged(data => emit(data));
    return function (d) {
      console.log(d);
    }
  })
}

export function* watchAccountChange() {
  const channel = yield call(handelAccountChanged)
  while (true) {
    try {
      const payload = yield take(channel)
      yield put({ type: connectMetaMaskSuccess.type, payload });
    } catch (e) {
      console.error('AccountChange error:', e)
      yield put({ type: connectMetaMaskFailure.type, payload: e.message });
    }
  }
}

function* mySaga() {
  yield takeLatest(connectMetaMaskRequest.type, connect);
  yield takeLatest(getContractDataRequest.type, fetchContractData);
  yield takeLatest(incCountRequest.type, incrementCount);
}

export default mySaga;
