import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import img from '../../../assets'

const Card = ({ el ,i,readMessage,readUser}) => {
  return (
      <Link 
        to="/"
        state={{ name: el.name, address: el.pubkey }}
        className={style.card}
      >
        <div className={style.Card} onClick={()=>{
            readMessage(el.pubkey),readUser(el.pubkey)
        }}>
            <div className={style.Card_box}>
                <div className={style.Card_box_left}>
                    <img src={img.accountName} alt='username' width={50} height={50}  className={style.Card_box_left_img}/>
                </div>
                <div className={style.Card_box_right}>
                    <div className={style.Card_box_right_middle}>
                        <h4>{el.name}</h4>
                        <small>{el.pubkey.slice(21)}..</small>
                    </div>
                    <div className={style.Card_box_right_end}>
                        <small>{i+1}</small>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default Card;
