import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Web3 from 'web3';
import { Web3Context } from '../../provider/Web3Provider';
import { FaEthereum } from 'react-icons/fa';

const Navbar = () => {
  const { web3, account } = useContext(Web3Context)
  const [ balance, setBalance ] = useState()
  useEffect(() => {
    (async () => {
      const balance = await web3?.eth?.getBalance(account)
      const balanceInEther = web3?.utils?.fromWei(balance, 'ether')
      if (!account) setBalance("")
      setBalance(balanceInEther)
    })()
  }, [web3, account])

  return (
    <Box mb="20px">
        <HStack justifyContent={"space-between"} mx="20px">
            <Box p={"30px"} display={"flex"}>
              <Heading size={"xl"} color={"teal"} fontWeight={"light"}>Poke</Heading>
              <Text fontSize={"25px"} fontWeight={"extrabold"} color={"teal"}><FaEthereum /></Text>
            </Box>
            <Box>
              <Button colorScheme={"teal"}><FaEthereum /><Text ml="10px">{balance}</Text></Button>
            </Box>
        </HStack>
        <Outlet />
    </Box>
  )
}

export default Navbar