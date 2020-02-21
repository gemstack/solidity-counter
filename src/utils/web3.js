import Web3 from 'web3'
import { ABI } from './../constant';

export const connectToMetaMask = async () => {
  let data = {};
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      const account = await window.ethereum.enable();
      data.network = window.ethereum.networkVersion;
      data.address = account[0];
      return data;
    } catch (error) {
      throw error;
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    const network = await window.web3.version.getNetwork();
    data.network = network;
    data.address = window.web3.eth.accounts[0];
    return data;
  }
  // Non-dapp browsers...
  else {
    throw new Error('Non-Ethereum browser detected. Please install MetaMask and reload the browser');
  }
}

export const getNetworkName = (id) => {
  const network = {
    "1": 'Mainnet',
    "2": 'Morden test network',
    "3": 'Ropsten test network',
    "4": 'Rinkeby test network',
    "42": 'Kovan test network',
  }
  return network[id] || 'Unknown network';
}

export const getContractData = async (contractAddress) => {
  const contract = new window.web3.eth.Contract(ABI, contractAddress)
  const count = await contract.methods.i().call();
  const lastIncrementor = await contract.methods.incrementer().call();
  return {
    count,
    lastIncrementor
  }
}

export const incrementVar = async (from, contractAddress) => {
  const contract = new window.web3.eth.Contract(ABI, contractAddress)
  return await contract.methods.incrementVar().send({
    from
  });
}

export const onAccountChanged = (cb) => {
  window.ethereum.on('accountsChanged', (accounts) => {
    cb({ address: accounts[0], network: window.ethereum.networkVersion })
  });
}
