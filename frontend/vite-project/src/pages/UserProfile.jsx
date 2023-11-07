import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Text } from '@chakra-ui/react'
import ProductCard from '../components/Home/ProductCard'
import axios from 'axios'

const UserProfile = () => {
  const { accountId } = useParams()
  const [ profile, setProfile ] = useState()
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:8200/pokemons?accountId=${accountId}`)
      setProfile(response.data)
    })()
  }, [accountId])

  return (
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
                type === "flying" ? "" :
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
  )
}

export default UserProfile