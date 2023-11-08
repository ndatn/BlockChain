import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Heading, Text, useDisclosure } from '@chakra-ui/react'
import ProductCard from '../components/Home/ProductCard'
import axios from 'axios'
import { Web3Context } from '../provider/Web3Provider'
import CustomModal from '../components/base/CustomModal'

const UserProfile = () => {
  const { accountId } = useParams()
  const [ profile, setProfile ] = useState()
  const [ pokemonBuyed, setPokemonBuyed ] = useState([])
  const [ transaction, setTransaction ] = useState()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [ amount, setAmount ] = useState()

  const { web3, account } = useContext(Web3Context)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:8200/pokemons/buyed/${accountId.toLowerCase()}`)
        setPokemonBuyed(response.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [accountId])

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:8200/pokemons?accountId=${accountId}`)
      setProfile(response.data)
    })()
  }, [accountId])

  const handleGetTransaction = async (transaction, amount) => {
    const transactionDetail = await web3?.eth?.getTransaction(transaction) 
    setTransaction(transactionDetail)
    setAmount(amount)
    onOpen()
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap="30px">
      <Container maxW={"container.lg"} display={"flex"} justifyContent={"space-evenly"} gap="20px">
        <Box>
          <Text fontSize={"30px"} mb="10px" color="teal" fontWeight={"light"}>Your pokemon token</Text>
          <ProductCard 
            key={profile?.id}
            title={`${profile?.name.charAt().toUpperCase()}${profile?.name.slice(1, profile.length)}`}
            url={profile?.sprite}
            price={profile?.ammount}
          />
        </Box>
        <Box mt="5px" display={"flex"} flexDirection={"column"} gap="20px">
          <Text>Account: <span style={{ fontWeight: "bold", color: "teal" }}>{accountId}</span></Text>
          <Box>
            <Text fontSize={"25px"} mb="10px" color="teal" fontWeight={"light"}>Pokemon token detail: </Text>
            <Text>Height: <span>{profile?.height}</span></Text>
            <Text>Weight: <span>{profile?.weight}</span></Text>
            <Text>Species: <span>{profile?.species}</span></Text>
            <Text>
              Type:  
              {profile?.types?.map(type => {
                return <Button w={"100px"} mx="5px" colorScheme={
                  type === "grass" ? "green" : 
                  type === "poison" ? "purple" : 
                  type === "fire" ? "orange" : 
                  type === "flying" ? "gray" :
                  type === "dragon" ? "yellow" :
                  type === "water" ? "blue" : ""
                }>{type}</Button>
              })}
            </Text>
          </Box>
          <Box w={"80%"}>
            <Text fontSize={"25px"} color="teal" fontWeight={"light"}>Decription:</Text>
            <Text>{profile?.description}</Text>
          </Box>
        </Box>
      </Container>
      <Container maxW={"container.lg"}>
        <Heading fontWeight={"light"} color={"teal"}>Pokemons has been buyed</Heading>
        <Box mt="20px" display={"flex"} gap={"10px"} flexWrap={"wrap"}>
          {pokemonBuyed.map(pokemon => {
            return <ProductCard 
              key={pokemon?.id}
              title={`${pokemon?.name.charAt().toUpperCase()}${pokemon?.name.slice(1, pokemon.length)}`}
              url={pokemon?.sprite}
              onClick={handleGetTransaction.bind(this, pokemon?.transactionHash, pokemon?.amount)}
            />
          })}
        </Box>
      </Container>
      <CustomModal 
        blockHash={transaction?.hash}
        from={transaction?.from}
        to={transaction?.to}
        blockNumber={amount}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

export default UserProfile