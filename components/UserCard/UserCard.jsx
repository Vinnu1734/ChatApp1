import React from 'react'
import style from "./UserCard.module.css";
import img from '../../assets/index';
import { useNavigate } from 'react-router-dom';


function UserCard({el,i,addFriends}) {
  // console.log(`in usercard ${el}`);
  const navigate=useNavigate();
  return (
    <div className={style.UserCard}>
      <div className={style.UserCard_box}>
        <img src={img[`image${i+1}`]} alt="user" width={100} height={100} className={style.UserCard_box_img}/>

        <div className={style.UserCard_box_info}>
          
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0,25)}..</p>
          <button onClick={()=>addFriends({name:el.name,accountAddress:el.accountAddress,navigate:navigate})}>Add Friend</button>
        </div>
      </div>
      <small className={style.number}>{i+1}</small>
    </div>
  )
}

export default UserCard