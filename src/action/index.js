import {
  META_MASK_CONNECT_REQUEST,
  META_MASK_CONNECT_SUCCESS,
  META_MASK_CONNECT_FAILURE,
  CONTRACT_DATA_REQUEST,
  CONTRACT_DATA_SUCCESS,
  CONTRACT_DATA_FAILURE,
  CONTRACT_INC_REQUEST,
  CONTRACT_INC_SUCCESS,
  CONTRACT_INC_FAILURE
} from "./constant";

export const connectMetaMask = item => {
  return {
    type: META_MASK_CONNECT_REQUEST,
    payload: item
  };
};
export const connectMetaMaskSuccess = data => {
  return {
    type: META_MASK_CONNECT_SUCCESS,
    payload: data
  };
};
export const connectMetaMaskFailure = message => {
  return {
    type: META_MASK_CONNECT_FAILURE,
    payload: message
  };
};


export const getContractDataRequest = item => {
  return {
    type: CONTRACT_DATA_REQUEST,
    payload: item
  };
};
export const getContractDataSuccess = data => {
  return {
    type: CONTRACT_DATA_SUCCESS,
    payload: data
  };
};
export const getContractDataFailure = message => {
  return {
    type: CONTRACT_DATA_FAILURE,
    payload: message
  };
};


export const incCountRequest = (address, network) => {
  return {
    type: CONTRACT_INC_REQUEST,
    payload: {
      address,
      network
    }
  };
};
export const incCountSuccess = data => {
  return {
    type: CONTRACT_INC_SUCCESS,
    payload: data
  };
};
export const incCountFailure = message => {
  return {
    type: CONTRACT_INC_FAILURE,
    payload: message
  };
};
