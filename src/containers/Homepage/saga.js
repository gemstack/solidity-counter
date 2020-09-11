import { call, put, takeLatest } from "redux-saga/effects";
import {
  getContractDataRequest,
  getContractDataSuccess,
  getContractDataFailure,
  incCountRequest,
  incCountSuccess,
  incCountFailure
} from './reducer';
import { CONTRACT_ADDRESS } from '../../constant';
import { getContractData, incrementVar } from "../../services/contract";

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

function* mySaga() {
  yield takeLatest(getContractDataRequest.type, fetchContractData);
  yield takeLatest(incCountRequest.type, incrementCount);
}

export default mySaga;
