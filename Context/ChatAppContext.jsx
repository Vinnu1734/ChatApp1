import React,{useState,useEffect} from 'react';
import {CheckIfWalletConnected,connectWallet,connectingWithContract,ConvertTime} from '../utils/apiFeature'
import { isAddress } from "ethers";


export const ChatAppContext=React.createContext();

export const ChatAppProvider=({children})=>{

    const [account,setAccount]=useState("");
    const [userName,setUserName]=useState("");
    const [friendLists,setFriendLists]=useState([]);
    const [friendMsg,setFriendMsg]=useState([]);
    const [loading,setLoading]=useState(false);
    const [userLists,setUserLists]=useState([]);
    const [error,setError]=useState("");


    const [currentUserName,setCurrentUserName]=useState("");
    const [currentUserAddress,setCurrentUserAddress]=useState("");


    const fetchData=async()=>{
        try {
            const contract = await connectingWithContract();
            console.log(contract.target)
            if (!contract) throw new Error("Contract not initialized");

            const connectAccount = await connectWallet();
            console.log(connectAccount)
            setAccount(connectAccount);

            const userName=await contract.getUsername(connectAccount);
            console.log(userName)
            setUserName(userName);
            const friendLists=await contract.getMyFriendList();
            setFriendLists(friendLists);
            const userList=await contract.getAllAppUser();
            setUserLists(userList);

        } catch (error) {
            // setError(`error at context fetchdata ${error}`);
            console.log(error)
        }
    }



    const readMessage=async(friendAddress)=>{
        try {
            const contract=await connectingWithContract();
            const read=await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            console.log(`error in context readmessage ${error}`);
        }
    }

    const createAccount=async({name,accountAddress,navigate})=>{
        try {
            // if(name || accountAddress){
            //     return setError("Name and account address,cannot be empty");
                
            // }
            const contract=await connectingWithContract();
            const getCreatedUser=await contract.createAccount(name);

            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
           console.log(`error at context api createAccount ${error}`); 
        }
    }

    const addFriends=async({name,accountAddress,navigate})=>{
        try {
            // if(name||accountAddress) return setError("Please provide data");
            const contract = await connectingWithContract();
            // console.log(contract.target)
            if (!contract) throw new Error("Contract not initialized");

            const addMyFriend=await contract.addFriend(accountAddress,name);
                setLoading(true);
                await addMyFriend.wait();
                setLoading(false);
                window.location.reload();
                navigate("/")
        } catch (error) {
            console.log(`error at addfriend context ${error}`);
        }
    }

    const sendMessage=async({msg,address})=>{
        try {
            console.log(msg)
            // if(msg||address)return setError("please type your message");

            const contract=await connectingWithContract();
            const addMessage=await contract.sendMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(`error at sendMessage context ${error}`)
        }
    }

    const readUser=async(userAddress)=>{
        const contract=await connectingWithContract();
        const userName=await contract.getUsername(userAddress);
        setCurrentUserAddress(userAddress);
        setCurrentUserName(userName);
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <ChatAppContext.Provider value={{readMessage,createAccount,addFriends,sendMessage,readUser,account,userName,friendLists,friendMsg,loading,userLists,error,currentUserName,currentUserAddress,CheckIfWalletConnected,connectWallet,connectingWithContract,ConvertTime}}>
            {children}
        </ChatAppContext.Provider>
    )
}
