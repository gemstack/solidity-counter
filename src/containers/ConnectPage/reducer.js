import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'dapp',
  initialState: {
    isMetaMaskConnected: false,
    isMetaMaskConnectRequested: false,
    metaMaskConnectionError: 'In order use the dapp please install and login with metamask and press connect.',
    network: '',
    address: '',
  },
  reducers: {
    connectMetaMaskRequest(state) {
      state.isMetaMaskConnectRequested = true;
    },
    connectMetaMaskSuccess(state, action) {
      state.network = action.payload.network;
      state.address = action.payload.address;
      state.isMetaMaskConnected = true;
      state.metaMaskConnectionError = '';
      state.incCountReqLoading = false;
      state.incCountReqSuccess = false;
      state.isMetaMaskConnectRequested = false;
      state.incCountReqError = '';
    },
    connectMetaMaskFailure(state, action) {
      state.isMetaMaskConnected = false;
      state.metaMaskConnectionError = action.payload;
    },
  }
})

const { actions, reducer } = configSlice;

export const {
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
} = actions;

export default reducer;
