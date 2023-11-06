import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Web3Context } from '../provider/Web3Provider';
import { Container, Heading, Text } from '@chakra-ui/react';

const Transaction = () => {
    const { web3, account } = useContext(Web3Context)
    const [ transactionCount, setTransactionCount ] = useState(0)
    const fetchTransactions = async () => {
        try {
            // Get the current wallet address
            const accounts = await web3?.eth.getAccounts();
            const address = accounts[0];      
            // Get the transaction history
            const history = await web3?.eth.getTransactionCount(address, 'latest');
            console.log(history)
            // Set the transaction list in state
            // setTransactions(history);
            setTransactionCount(history)
          } catch (error) {
            console.error(error);
          }
    };

    async function getAccountTransactions() {
        web3.eth.getTransactionCount(web3.eth.accounts[0], 'latest', (err, current)=>{
            for (var i=1; i <= current; i++) {
              web3.eth.getBlock(i, (err, res) => {
                console.log(res)
              })
            }
          });
      }

    useEffect(() => {
        fetchTransactions()
        getAccountTransactions()
    }, [web3])
  return (
    <Container maxW={"xl"}>
        <Text>Transactions from {account}</Text>
        <Text>All transaction count: {transactionCount.toString()}</Text>
    </Container>
  )
}

export default Transaction