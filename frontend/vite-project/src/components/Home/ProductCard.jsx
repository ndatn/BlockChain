import { Box, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const ProductCard = ({ url, title, onClick, price }) => {
  return (
    <Box height={"400px"} width={"300px"}  bg={"gray.100"} overflow={"hidden"} _hover={{
        boxShadow: "10px 10px 20px teal",
        transition: "200ms",
        transform: "scale(1.04)"
    }}>
        <Image 
            src={url}
            w={"300px"}
        />
        <Box m="10px" display={"flex"} flexDirection={"column"} gap="15px">
            <Text fontSize={"18px"} fontWeight={"bold"} color={"teal"}>{title}</Text>
            <Button overflow={"hidden"} colorScheme='teal' rounded={0} width={"100%"} onClick={onClick}>Buy with {price}<FaEthereum /></Button>
        </Box>
    </Box>
  )
}

export default ProductCard