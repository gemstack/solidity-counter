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
