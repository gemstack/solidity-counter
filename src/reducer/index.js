import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'dapp',
  initialState: {
    isMetaMaskConnected: false,
    isMetaMaskConnectRequested: false,
    metaMaskConnectionError: 'In order use the dapp please install and login with metamask and press connect.',
    network: '',
    address: '',
    contractFetchError: '',
    smartContractData: {
      totalCount: '0',
      lastIncrementor: '',
    },
    incCountReqLoading: false,
    incCountReqSuccess: false,
    incCountReqError: '',
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
    getContractDataRequest(state) { },
    getContractDataSuccess(state, action) {
      state.smartContractData = {
        ...state.smartContractData,
        lastIncrementor: action.payload.lastIncrementor,
        totalCount: action.payload.count
      };
      state.contractFetchError = '';
    },
    getContractDataFailure(state, action) {
      state.smartContractData = {};
      state.contractFetchError = action.payload;
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
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
  getContractDataRequest,
  getContractDataSuccess,
  getContractDataFailure,
  incCountRequest,
  incCountSuccess,
  incCountFailure } = actions;

export default reducer;




// import {
//   META_MASK_CONNECT_SUCCESS,
//   META_MASK_CONNECT_FAILURE,
//   CONTRACT_DATA_SUCCESS,
//   CONTRACT_DATA_FAILURE,
//   CONTRACT_INC_REQUEST,
//   CONTRACT_INC_SUCCESS,
//   CONTRACT_INC_FAILURE,
// } from "./../action/constant";


// const initialState = {
//   smartContractData: {
//     totalCount: '0',
//     lastIncrementor: '',
//   },
//   network: '',
//   address: '',
//   isMetaMaskConnected: false,
//   contractFetchError: '',
//   metaMaskConnectionError: 'In order use the dapp please install and login with metamask and press connect.',
//   incCountReqLoading: false,
//   incCountReqSuccess: false,
//   incCountReqError: '',
// }


// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case META_MASK_CONNECT_SUCCESS:
//       return Object.assign({}, state, {
//         network: action.payload.network,
//         address: action.payload.address,
//         isMetaMaskConnected: true,
//         metaMaskConnectionError: '',
//         incCountReqLoading: false,
//         incCountReqSuccess: false,
//         incCountReqError: '',
//       });
//     case META_MASK_CONNECT_FAILURE:
//       return Object.assign({}, state, {
//         isMetaMaskConnected: false,
//         metaMaskConnectionError: action.payload,
//       });
//     case CONTRACT_DATA_SUCCESS:
//       return Object.assign({}, state, {
//         smartContractData: {
//           ...state.smartContractData,
//           lastIncrementor: action.payload.lastIncrementor,
//           totalCount: action.payload.count
//         },
//         contractFetchError: '',
//       });
//     case CONTRACT_DATA_FAILURE:
//       return Object.assign({}, state, {
//         smartContractData: {
//         },
//         contractFetchError: action.payload,
//       });
//     case CONTRACT_INC_REQUEST:
//       return Object.assign({}, state, {
//         incCountReqLoading: true,
//         incCountReqSuccess: false,
//         incCountReqError: '',
//       });
//     case CONTRACT_INC_SUCCESS:
//       return Object.assign({}, state, {
//         incCountReqLoading: false,
//         incCountReqSuccess: true,
//         incCountReqError: '',
//       });
//     case CONTRACT_INC_FAILURE:
//       return Object.assign({}, state, {
//         incCountReqLoading: false,
//         incCountReqSuccess: false,
//         incCountReqError: action.payload,
//       });
//     default:
//       return state;
//   }
// };
