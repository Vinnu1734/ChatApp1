import React, { useContext, useState } from 'react'
import style from "./Model.module.css";
import img from "../../assets/index"
import {ChatAppContext} from '../../Context/ChatAppContext'
import Loader from "../../components/Loader/Loader";

function Model({openBox,title,head,info,smallInfo,image,functionName,address,navigate}) {

  const [name,setName]=useState("");
  const [accountAddress,setAccountAddress]=useState("");
  const {loading }=useContext(ChatAppContext)

  return (
    <div className={style.Model}>
      <div className={style.Model_box}>
        <div className={style.Model_box_left}>
          <img src={image} alt="Buddy" width={700} height={700} />
        </div>
        <div className={style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader></Loader>
          ) : (
            <div className={style.Model_box_right_name}>
              <div className={style.Model_box_right_name_info}>
                <img src={img.username} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={name || "your name"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    return setName(e.target.value)
                  }}
                />
              </div>
              <div className={style.Model_box_right_name_info}>
                <img src={img.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={address || "Enter address..."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div className={style.Model_box_right_name_btn}>
                <button
                  onClick={() => {
                    console.log("name:", name, accountAddress, "model")
                    functionName({name, accountAddress,navigate})
                  }}
                >
                  {""}
                  <img src={img.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>

                <button
                  onClick={() => {
                    openBox(false)
                  }}
                >
                  {""}
                  <img src={img.close} alt="send" width={30} height={30} />
                  {""}
                  cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Model