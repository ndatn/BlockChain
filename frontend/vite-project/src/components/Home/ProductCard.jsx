import { Box, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ProductCard = ({ url, title, onClick }) => {
  return (
    <Box height={"500px"} width={"300px"} rounded={"20px"} bg={"gray.100"} overflow={"hidden"} _hover={{
        boxShadow: "10px 10px 20px teal",
        transition: "200ms"
    }}>
        <Image 
            src={url}
            height={"400px"}
            width={"300px"}
        />
        <Box m="10px" display={"flex"} flexDirection={"column"} gap="15px">
            <Text fontSize={"18px"} fontWeight={"bold"} color={"teal"}>{title}</Text>
            <Button colorScheme='teal' onClick={onClick}>View Detail</Button>
        </Box>
    </Box>
  )
}

export default ProductCard