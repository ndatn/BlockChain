import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Home/ProductCard'
import axios from 'axios'
import { Container, Text, useDisclosure } from '@chakra-ui/react'
import Web3 from 'web3'
import CustomModal from '../components/base/CustomModal'
import { useContext } from 'react'
import { Web3Context } from '../provider/Web3Provider'

const Home = () => {
    const [ books, setBooks ] = useState([])
    const { web3, account } = useContext(Web3Context)
    const [ transactionReceipt, setTransactionReceipt ] = useState({})
    const { isOpen, onClose, onOpen } = useDisclosure()
    
    useEffect(() => {
        (async () => {
            try {
                var response = await axios.get("http://localhost:8200/books")
                setBooks(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleCreateTransaction = async () => {
        if (web3 && account) {
            const recipientAddress = '0x7F745e80706FBA56e2C2de221d153c75ab4029c3'; // Specify the recipient's Ethereum address
            const amountToSend = 1; // Specify the amount of ETH to send
        
            try {
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 21000;
            const transactionParameters = {
                from: account,
                to: recipientAddress,
                value: web3.utils.toWei(amountToSend.toString(), 'ether'),
                gasPrice,
                gas: gasLimit,
            };
        
            const signedTransaction = await web3.eth.accounts.signTransaction(
                transactionParameters,
                '20453bc702182298d9a2342d206394cf68258b79a2ddc60fc9f473e75f96b9cc'
            );
        
            const transactionReceipt = await web3.eth.sendSignedTransaction(
                signedTransaction.rawTransaction
            );
        
            // console.log('Transaction Receipt:', transactionReceipt);
            setTransactionReceipt(transactionReceipt)
            onOpen()
            } catch (error) {
            console.error('Error while creating transaction:', error);
            }
        }
    };

    console.log(transactionReceipt)

    return (
        <>
            <Container mb={"10px"}>
                <div>logged account: <Text fontWeight={"bold"}>{account}</Text></div>
            </Container>
            <Container maxW={"container.xl"} display={"flex"} flexWrap={"wrap"} gap="10px">
                {books.map(book => {
                    return (
                        <ProductCard 
                            key={book?.id}
                            title={book.name}
                            url={`http://localhost:8200/${book.picture}`}
                            onClick={handleCreateTransaction}
                        />
                    )
                })}
            </Container>
            <CustomModal 
                isOpen={isOpen}
                onClose={onClose}
                blockHash={transactionReceipt?.transactionHash}
                from={transactionReceipt?.from}
            />
        </>
    )
}

export default Home