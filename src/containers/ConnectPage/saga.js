import { call, put, takeLatest, fork, take } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import {
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
} from './reducer';
import { getContractDataRequest } from '../Homepage/reducer';
import connectToMetaMask, { onAccountChanged } from '../../services/connectToMetamask';

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
      if (!payload.address) throw new Error('Disconnected with metamask. Please reload the page and connect again.');
      yield put({ type: connectMetaMaskSuccess.type, payload });
    } catch (e) {
      console.error('AccountChange error:', e)
      yield put({ type: connectMetaMaskFailure.type, payload: e.message });
    }
  }
}

function* mySaga() {
  yield takeLatest(connectMetaMaskRequest.type, connect);
}

export default mySaga;
