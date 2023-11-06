import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import Web3 from 'web3';
import { Web3Context } from '../../provider/Web3Provider';

const Navbar = () => {
  const { web3, setNullAccount } = useContext(Web3Context) 
  const handleLogout = () => {
    setNullAccount()
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.off('accountsChanged', handleLogout);
      }
    };
  }, []);
  const logOut = async () => {
    handleLogout()   
  };
  return (
    <>
        <Box p={"30px"} display={"flex"} justifyContent={"space-around"}>
            <Heading size={"xl"} color={"blue.500"}>Book store</Heading>
            <Button colorScheme='red' onClick={logOut}>Log out</Button>
        </Box>
        <Outlet />
    </>
  )
}

export default Navbar