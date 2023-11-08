import React, { useEffect, useState, useLayoutEffect } from 'react'
import ProductCard from '../components/Home/ProductCard'
import axios from 'axios'
import { Box, Container, Modal, ModalContent, ModalOverlay, Text, useDisclosure, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import Web3 from 'web3'
import CustomModal from '../components/base/CustomModal'
import { useContext } from 'react'
import { Web3Context } from '../provider/Web3Provider'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [ pokemons, setPokemons ] = useState([])
    const { web3, account } = useContext(Web3Context)
    const [ transactionReceipt, setTransactionReceipt ] = useState({})
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [ transactionPayload, setTransactionPayload ] = useState({})
    const { isOpen: isWarningModalOpen, onOpen: onWarningModalOpen, onClose: onWarningModalClose } = useDisclosure()
    const navigate = useNavigate()
    
    useLayoutEffect(() => {
        (async () => {
            try {
                var response = await axios.get("http://localhost:8200/pokemons")
                setPokemons(response.data.filter(pokemon => {
                    return pokemon.accountId !== account
                }))
            } catch (error) {
                console.log(error)
            }
        })()
    }, [account])

    const handleCreateTransaction = async (recipientAddress, amountToSend) => {
        if (web3 && account) {
            // const recipientAddress = '0x65758ca5bD89120E3F87B555127288ae9740dc6b'; // Specify the recipient's Ethereum address
            // const amountToSend = 1; // Specify the amount of ETH to send
        
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
        
            web3.eth.sendTransaction(transactionParameters)
            .on('transactionHash', (hash) => {
              console.log('Transaction hash:', hash);
              // Transaction has been sent
            })
            .on('receipt', async (receipt) => {
              console.log('Transaction receipt:', receipt);
              // Transaction has been confirmed
              onOpen()
              setTransactionReceipt(receipt)
              await axios.post("http://localhost:8200/transactions", {
                transactionHash: receipt?.transactionHash,
                senderId: receipt?.from,
                amount: transactionPayload?.amountToSend
              })
              await axios.post("http://localhost:8200/pokemon", {
                name: transactionPayload?.name,
                amount: transactionPayload?.amountToSend,
                sprite: transactionPayload?.sprite,
                transactionHash: receipt?.transactionHash,
                accountId: receipt?.from
              })
            })
            .on('error', (error) => {
              console.error('Transaction error:', error);
            });
            } catch (error) {
            console.error('Error while creating transaction:', error);
            }
        }
    };

    return (
        <>
            <Container mb={"10px"} display={"flex"} maxW={"container.xl"} gap="10px" p="10px" justifyContent={"space-between"}>
                <Box>
                    <Box>Detected <span style={{ fontWeight: "bold", color: "#DD6B20" }}>Metamask</span> wallet account: </Box>
                    <Text fontWeight={"bold"} color="#DD6B20">{account}</Text>
                </Box>
                <Button colorScheme='teal' onClick={() => navigate("/transaction")}>Transaction history</Button>
            </Container>
            <Container maxW={"container.xl"} display={"flex"} flexWrap={"wrap"} gap="10px">
                {pokemons.map(pokemon => {
                    return (
                        <ProductCard 
                            key={pokemon?.id}
                            title={`${pokemon.name.charAt().toUpperCase()}${pokemon.name.slice(1, pokemon.length)}`}
                            url={pokemon?.sprite}
                            price={pokemon?.ammount}
                            onClick={() => {
                                onWarningModalOpen()
                                setTransactionPayload({
                                    ...transactionPayload,
                                    recipientAddress: pokemon?.accountId,
                                    amountToSend: pokemon?.ammount,
                                    accountId: account,
                                    name: pokemon?.name,
                                    sprite: pokemon?.sprite
                                })
                            }}
                        />
                    )
                })}
            </Container>
            <Modal isOpen={isWarningModalOpen} onClose={onWarningModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Before creating transaction alert</ModalHeader>
                    <ModalBody>
                        <Text>By pressing the <span style={{ fontWeight: "bold", color: "teal" }}>Create transaction</span> button which means <span style={{ fontWeight: "bold", color: "teal" }}>you are ready to create a transaction</span> to buy this pokemon token from account: <span style={{ fontWeight: "bold", color: "red" }}>{transactionPayload?.accountId}</span>. Feel free to press the close button if you want to cancel it.</Text>
                    </ModalBody>
                    <ModalFooter display={"flex"} gap={"8px"}>
                        <Button colorScheme='red' onClick={onWarningModalClose}>Close</Button>
                        <Button colorScheme='teal' onClick={() => {
                            handleCreateTransaction(transactionPayload?.recipientAddress, transactionPayload?.amountToSend)
                            onWarningModalClose()
                        }}>Create transaction</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <CustomModal 
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    window.location.reload()
                }}
                blockHash={transactionReceipt?.transactionHash}
                from={transactionReceipt?.from}
                to={transactionReceipt?.to}
                // blockNumber={transactionReceipt?.value?.toString()?.slice(0, 1)}
            />
        </>
    )
}

export default Home