import { ABI } from './../constant';

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