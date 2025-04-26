import {ethers} from 'ethers';
import Web3Modal from "web3modal";

import {ChatAppAddress,ChatAppABI} from '../Context/constans';


export const CheckIfWalletConnected=async()=>{
    try {
        if(!window.ethereum) return console.log("Install metamask first");

        const accounts=await window.ethereum.request({
            method:"eth_accounts",
        });
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
}

export const connectWallet=async()=>{
    try {
        if(!window.ethereum) return console.log("Install metamask");

        const accounts=await window.ethereum.request({
            method:"eth_requestAccounts",
        })
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
}


const fetchContract=(signerOrProvider)=>{
    if (!signerOrProvider) {
        throw new Error("Signer or provider not found");
    }
     console.log("Creating contract with signer/provider:", signerOrProvider);
    return new ethers.Contract(ChatAppAddress,ChatAppABI,signerOrProvider);
}

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection); 
        const signer = await provider.getSigner(); // Must use `await`

        const contract = fetchContract(signer);
        
        if (!contract) throw new Error("Contract not found!");
        
        return contract;
    } catch (error) {
        console.error("Error connecting with contract:", error);
    }
};

// Ensure this is correctly imported

// export const connectingWithContract = async () => {
//     try {
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         if (!connection) throw new Error("No connection established with Web3Modal");

//         console.log("Web3Modal Connection:", connection);

//         const provider = new ethers.BrowserProvider(connection);
//         if (!provider) throw new Error("Provider initialization failed");

//         console.log("Ethers Provider:", provider);

//         const signer = await provider.getSigner();
//         if (!signer) throw new Error("Signer not found");

//         console.log("Signer Address:", await signer.getAddress());

//         const contract = fetchContract(signer);
//         if (!contract) throw new Error("Contract instance creation failed");

//         console.log("Connected Contract:", contract);

//         return contract;
//     } catch (error) {
//         console.error("Error connecting with contract:", error.message);
//         return null; // Return null to handle errors gracefully
//     }
// };



export const ConvertTime = (time) => {
    const timestamp = typeof time === "bigint" ? Number(time) : (time.toNumber ? time.toNumber() : time);
    const newTime = new Date(timestamp * 1000); // Assuming blockchain timestamp in seconds

    return `${newTime.getHours()}/${newTime.getMinutes()}/${newTime.getSeconds()} 
    Date: ${newTime.getDate()}/${newTime.getMonth() + 1}/${newTime.getFullYear()}`;
};

