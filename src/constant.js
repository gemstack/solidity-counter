export const CONTRACT_ADDRESS = {
  "3": '0x7bAe6F19A47B7ef5FC2216913cfc05646f1261E5',
};

export const ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "i",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "incrementVar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "incrementer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export const ROUTES = {
  HOMEPAGE: '/',
  CONNECT_PAGE: '/connect',
};
