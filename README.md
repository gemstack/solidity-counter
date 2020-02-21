# Dapp App

## Requirements

DAPP will work with the smart contract “Increment”, that consists of a function that increments a stored number and store the address of the account that incremented that value last. The solidity code is below.

The DAPP has to have the following features:

1.  Shows the number stored in the contract

2.  Shows the address of the last incrementer of the number

3.  Contains a button to increment the number in the contract

4.  Shows the message (in any way) if the last incrementer is the current user (currently selected account in Metamask) and handle changes of accounts in Metamask correctly

5.  Shows the count of increments by currently selected account (store this count in a browser)

## SmartContract

`
pragma solidity 0.5.12;

contract Increment {
uint256 public i;
address public incrementer;
function incrementVar() public {
i++;
incrementer = msg.sender;
}
}`
