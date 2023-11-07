import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Web3Context } from '../provider/Web3Provider';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from '../components/base/CustomModal';

const Transaction = () => {
    const { web3, account } = useContext(Web3Context)
    const [ transactionCount, setTransactionCount ] = useState(0)
    const [ transactions, setTransactions ] = useState([])
    const [ transaction, setTransaction ] = useState()
    const [ createdDate, setCreatedDate ] = useState()
    const { onOpen, isOpen, onClose } = useDisclosure()

    useEffect(() => {
      (async () => {
        const accounts = await web3?.eth?.getAccounts();
        console.log(accounts)
        const address = accounts[0];      
        if (address !== null || address !== undefined) {
          const response = await axios.get(`http://localhost:8200/transactions?senderId=${address.toLowerCase()}`)
          setTransactions(response.data)
        }
      })()
    }, [account])

    const fetchTransactions = async () => {
        try {
            // Get the current wallet address
            const accounts = await web3?.eth?.getAccounts();
            console.log(accounts)
            const address = accounts[0];      
            // Get the transaction history
            const history = await web3?.eth?.getTransactionCount(address, 'latest');
            console.log(history)
            // Set the transaction list in state
            // setTransactions(history);
            setTransactionCount(history)
          } catch (error) {
            console.error(error);
          }
    };

    useEffect(() => {
        fetchTransactions()
    }, [web3])

    const handleGetTransaction = async (transaction, createdDate) => {
      const transactionDetail = await web3?.eth?.getTransaction(transaction) 
      setTransaction(transactionDetail)
      setCreatedDate(createdDate)
      onOpen()
      console.log(transactionDetail)   
    }
  return (
    <Box px="30px" w={"100%"}>
        <Text>Transactions of account: <span style={{ fontWeight: "bold" }}>{account}</span></Text>
        <Text>Total transaction (In Metamask): {transactionCount.toString()}</Text>
        <Text>Total transaction (In Database): {transactions.length}</Text>
        <Box mt="10px" w={"100%"} display={"flex"} flexDir={"column"} gap="10px" flexGrow={1}>
          {transactions.map(transaction => {
            return (
              <Box _hover={{
                background: "teal.500",
                transition: "200ms",
                color: "white"
              }} 
              key={transaction._id}
              onClick={handleGetTransaction.bind(this, transaction.transactionHash, transaction?.createdDate.toString())}
              w={"100%"} 
              p={"30px"} 
              bg={"gray.100"} 
              fontSize={"20px"} 
              fontWeight={"bold"}>
                {transaction.transactionHash}
              </Box>
            )
          })}
        </Box>
        <CustomModal 
          blockHash={transaction?.hash}
          from={transaction?.from}
          to={transaction?.to}
          blockNumber={transaction?.value?.toString()?.slice(0, 1)}
          isOpen={isOpen}
          onClose={onClose}
          createdDate={createdDate}
        />
    </Box>
  )
}

export default Transaction