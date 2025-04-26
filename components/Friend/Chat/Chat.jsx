import React, { useEffect, useState } from "react";
import style from "./Chat.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import img from "../../../assets";
import { ConvertTime } from "../../../utils/apiFeature";
import Loader from "../../Loader/Loader";


const Chat = ({
  functionName,
  readMessage,
  friendMsg = [],
  account,
  userName,
  Loading,
  currentUserName,
  currentUserAddress,
}) => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const navigate=useNavigate();

  useEffect(() => {
    if (location.state) {
      setChatData(location.state);
    }
  }, [location.state]);
  // console.log(chatData.name,chatData.address)



  return (
    <div className={style.Chat}>
      {
        currentUserAddress && currentUserName? (
          <div className={style.Chat_user_info}>
            <img src={img.accountName} alt="image" width={70} height={70} />
            <div className={style.Chat_user_info_box}>
              <h4>{currentUserName}</h4>
              <p className={style.show}>{currentUserAddress}</p>
            </div>
          </div>
        ):(
          " "
        )}
        <div className={style.Chat_box_box}>
          <div className={style.Chat_box}>
            <div className={style.Chat_box_left}>
              {
                friendMsg.map((el,i)=>(
                  <div>
                    {el.sender ==chatData.address?(
                      <div className={style.Chat_box_left_title}>
                        <img src={img.accountName} alt="image" width={70} height={80} />
                        <span>
                          {chatData.name} {" "}
                          <small>Time:{ConvertTime(el.timestamp)}</small>
                        </span>

                      </div>
                    ):(
                      <div className={style.Chat_box_left_title}>
                        <img src={img.accountName} alt="image" width={70} height={80} />
                        <span>
                          {userName} {" "}
                          <small>Time:{ConvertTime(el.timestamp)}</small>
                        </span>

                      </div>
                    )}
                    <p key={i+1}>{el.msg}{""}{""}</p>
                  </div>
                ))
              }
            </div>
          </div>
          {
            currentUserName && currentUserAddress?(
              <div className={style.Chat_box_send}>
                <div className={style.Chat_box_send_img}>
                  <img src={img.smile} alt="smile" width={50} height={50}/>
                  <input type="text" placeholder="type your message" 
                  onChange={(e)=>setMessage(e.target.value)}
                  />
                  <img src={img.file} alt="file" width={60} height={50} onClick={() => navigate("/payment",{state:{address:chatData.address}})}/>
                  {
                    Loading==true?(
                      <Loader></Loader>
                    ):(
                      <img src={img.send} alt="file" width={50} height={50} onClick={()=>functionName({msg:message,address:chatData.address})} />
                    )
                  }
                </div>
              </div>
            ):(
              " "
            )
          }
        </div>
    </div>


  )
};

export default Chat;
