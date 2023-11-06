import { createContext } from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";

export const Web3Context = createContext()

const Web3Provider = ({ children }) => {
    const [ web3, setWeb3 ] = useState(null);
    const [account, setAccount] = useState(null);

    const setNullAccount = () => {
        setAccount("")
    }

    useEffect(() => {
        const connectToMetaMask = async () => {
        if (window.ethereum) {
            // Modern dapp browsers (like MetaMask)
            const web3 = new Web3(window.ethereum);
            try {
            // Request account access if needed
            await window.ethereum.enable();
            setWeb3(web3);
            } catch (error) {
            console.error('User denied account access');
            }
        } else if (window.web3) {
            // Legacy dapp browsers (Ganache, etc.)
            const web3 = new Web3(window.web3.currentProvider);
            setWeb3(web3);
        } else {
            // Non-dapp browsers
            console.log('No web3 detected. You should consider trying MetaMask!');
        }
    };
    connectToMetaMask();
    }, []);

    useEffect(() => {
        const getAccount = async () => {
            if (web3) {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            }
        };
        getAccount();
    }, [web3]);

    const values = {
        web3,
        account,
        setNullAccount
    }

    return (
        <Web3Context.Provider value={values}>
            {children}
        </Web3Context.Provider>
    )
}

export default Web3Provider