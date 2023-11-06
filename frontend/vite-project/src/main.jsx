import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Web3Provider from './provider/Web3Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
)
