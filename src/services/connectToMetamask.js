import Web3 from 'web3'

export const onAccountChanged = (cb) => {
  window.ethereum.on('accountsChanged', (accounts) => {
    cb({ address: accounts[0], network: window.ethereum.networkVersion })
  });
}


const connectToMetaMask = async () => {
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

export default connectToMetaMask;
