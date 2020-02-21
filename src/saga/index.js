import { call, put, takeLatest, fork, take } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import { CONTRACT_ADDRESS } from './../constant';
import {
  META_MASK_CONNECT_REQUEST,
  CONTRACT_DATA_REQUEST,
  CONTRACT_INC_REQUEST
} from "./../action/constant";
import {
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
  getContractDataRequest,
  getContractDataSuccess,
  getContractDataFailure,
  incCountSuccess,
  incCountFailure
} from './../action';
import {
  connectToMetaMask,
  getContractData,
  incrementVar,
  onAccountChanged
} from "../utils/web3";

function* connect() {
  try {
    const data = yield call(connectToMetaMask);
    if (data && data.address && data.network) {
      yield put(connectMetaMaskSuccess(data));
      yield put(getContractDataRequest(data));
      // event to check address change
      yield fork(watchAccountChange);
    } else {
      yield put(connectMetaMaskFailure('No data found'));
    }
  } catch (e) {
    yield put(connectMetaMaskFailure(e.message));
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
      yield put(getContractDataSuccess(data));
    }
  } catch (e) {
    yield put(getContractDataFailure(e.message));
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
    yield put(incCountSuccess(data));
  } catch (e) {
    yield put(incCountFailure(e.message));
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
      yield put(connectMetaMaskSuccess(payload));
    } catch (e) {
      console.error('AccountChange error:', e)
      yield put(connectMetaMaskFailure(e.message));
    }
  }
}

function* mySaga() {
  yield takeLatest(META_MASK_CONNECT_REQUEST, connect);
  yield takeLatest(CONTRACT_DATA_REQUEST, fetchContractData);
  yield takeLatest(CONTRACT_INC_REQUEST, incrementCount);
}

export default mySaga;
