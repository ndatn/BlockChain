import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import Web3 from 'web3';
import { Web3Context } from '../../provider/Web3Provider';

const Navbar = () => {
  return (
    <Box mb="20px">
        <Box p={"30px"} display={"flex"}>
            <Heading size={"xl"} color={"teal"} fontWeight={"light"}>Poke</Heading>
            <Text fontSize={"25px"} fontWeight={"extrabold"} color={"teal"}>ETH</Text>
        </Box>
        <Outlet />
    </Box>
  )
}

export default Navbar