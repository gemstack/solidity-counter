import {
  META_MASK_CONNECT_SUCCESS,
  META_MASK_CONNECT_FAILURE,
  CONTRACT_DATA_SUCCESS,
  CONTRACT_DATA_FAILURE,
  CONTRACT_INC_REQUEST,
  CONTRACT_INC_SUCCESS,
  CONTRACT_INC_FAILURE,
} from "./../action/constant";


const initialState = {
  smartContractData: {
    totalCount: '0',
    lastIncrementor: '',
  },
  network: '',
  address: '',
  isMetaMaskConnected: false,
  contractFetchError: '',
  metaMaskConnectionError: 'In order use the dapp please install and login with metamask and press connect.',
  incCountReqLoading: false,
  incCountReqSuccess: false,
  incCountReqError: '',
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case META_MASK_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        network: action.payload.network,
        address: action.payload.address,
        isMetaMaskConnected: true,
        metaMaskConnectionError: '',
        incCountReqLoading: false,
        incCountReqSuccess: false,
        incCountReqError: '',
      });
    case META_MASK_CONNECT_FAILURE:
      return Object.assign({}, state, {
        isMetaMaskConnected: false,
        metaMaskConnectionError: action.payload,
      });
    case CONTRACT_DATA_SUCCESS:
      return Object.assign({}, state, {
        smartContractData: {
          ...state.smartContractData,
          lastIncrementor: action.payload.lastIncrementor,
          totalCount: action.payload.count
        },
        contractFetchError: '',
      });
    case CONTRACT_DATA_FAILURE:
      return Object.assign({}, state, {
        smartContractData: {
        },
        contractFetchError: action.payload,
      });
    case CONTRACT_INC_REQUEST:
      return Object.assign({}, state, {
        incCountReqLoading: true,
        incCountReqSuccess: false,
        incCountReqError: '',
      });
    case CONTRACT_INC_SUCCESS:
      return Object.assign({}, state, {
        incCountReqLoading: false,
        incCountReqSuccess: true,
        incCountReqError: '',
      });
    case CONTRACT_INC_FAILURE:
      return Object.assign({}, state, {
        incCountReqLoading: false,
        incCountReqSuccess: false,
        incCountReqError: action.payload,
      });
    default:
      return state;
  }
};
