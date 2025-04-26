import React ,{useState,useContext}from 'react'
import style from './Filter.module.css';
import { useNavigate } from 'react-router-dom';

import img from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import Model from "../Model//Model"

function Filter() {
  const {account,addFriends}=useContext(ChatAppContext)
  const [addFriend,setAddFriend]=useState(false);
  const navigate=useNavigate();
  return (
    <div className={style.Filter}>
      <div className={style.Filter_box}>
        <div className={style.Filter_box_left}>
          <div className={style.Filter_box_left_search}>
            <img src={img.search} alt="search" width={20} height={20} />
            <input type="text" placeholder='search..' />
          </div>
        </div>
        <div className={style.Filter_box_right}>
          <button onClick={()=>setAddFriend(true)}>
            <img src={img.user} alt="clear" width={20} height={20}/>ADD FRIEND
          </button>
        </div>
      </div>
      {
        addFriend &&(
          <div className={style.Filter_model}>
            <Model 
              openBox={setAddFriend} 
              title="welcome to" 
              head="chat buddy"
              info="lorem20"
              smallInfo="Kindley select your friend name & address"
              image={img.hero}
              functionName={addFriends}
              navigate
            >
              
            </Model>
          </div>
        )
      }
    </div>
  )
}

export default Filter