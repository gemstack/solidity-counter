import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'contract',
  initialState: {
    contractFetchError: '',
    isLoading: false,
    smartContractData: {
      totalCount: '0',
      lastIncrementor: '',
    },
    incCountReqLoading: false,
    incCountReqSuccess: false,
    incCountReqError: '',
  },
  reducers: {
    getContractDataRequest(state) {
      state.isLoading = true;
    },
    getContractDataSuccess(state, action) {
      state.smartContractData = {
        ...state.smartContractData,
        lastIncrementor: action.payload.lastIncrementor,
        totalCount: action.payload.count
      };
      state.isLoading = false;
      state.contractFetchError = '';
    },
    getContractDataFailure(state, action) {
      state.smartContractData = {};
      state.contractFetchError = action.payload;
      state.isLoading = false;
    },
    incCountRequest(state) {
      state.incCountReqLoading = true;
      state.incCountReqSuccess = false;
      state.incCountReqError = '';
    },
    incCountSuccess(state) {
      state.incCountReqLoading = false;
      state.incCountReqSuccess = true;
      state.incCountReqError = '';
    },
    incCountFailure(state, action) {
      state.incCountReqLoading = false;
      state.incCountReqSuccess = false;
      state.incCountReqError = action.payload;
    },
  }
})

const { actions, reducer } = configSlice;

export const {
  getContractDataRequest,
  getContractDataSuccess,
  getContractDataFailure,
  incCountRequest,
  incCountSuccess,
  incCountFailure } = actions;

export default reducer;
