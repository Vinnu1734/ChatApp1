import React,{useState,useContext} from 'react'
import style from "./Friend.module.css";

import img from '../../assets/index'
import Card from './Card/Card'
import Chat from './Chat/Chat';

import { ChatAppContext } from '../../Context/ChatAppContext';


function Friend() {
  // const array=[1,2,34,5,6];
  const{sendMessage,account,friendLists,readMessage,userName,loading,readUser,currentUserName,currentUserAddress,friendMsg}=useContext(ChatAppContext);
  // console.log(friendLists)
  return (
    <div className={style.Friend}>
      <div className={style.Friend_box}>
        <div className={style.Friend_box_left}>
          {
            friendLists.map((el,i)=>{
              return <Card 
                key={i+1}
                el={el}
                i={i}
                readUser={readUser}
                readMessage={readMessage}
              ></Card>
            })
          }
        </div>
        <div className={style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
          ></Chat>
        </div>
      </div>
    </div>
  )
}

export default Friend