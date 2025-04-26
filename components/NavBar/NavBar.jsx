import React, { useContext,useState } from 'react'
import {Link} from 'react-router-dom'

import style from './NavBar.module.css';
import {ChatAppContext} from '../../Context/ChatAppContext'
import {Model,Error} from "../Index";
import img from "../../assets"
import { useNavigate } from 'react-router-dom';


function NavBar() {

  const menuItems = [
    {
      menu:"All users",
      link:'/allUser'
    },
    {
      menu:"Chat",
      link:'/'
    },
    {
      menu:"Payment",
      link:'/'
    },
    {
      menu:"Settings",
      link:'/'
    },
    {
      menu:"FAQs",
      link:'/'
    },
    {
      menu:"Terms",
      link:'/'
    },
  ]

  const [active,setActive]=useState(2);
  const [open,setOpen]=useState(false);
  const [openModel,setOpenModel]=useState(false);

  const {account,userName,connectWallet,createAccount,error}=useContext(ChatAppContext);

  const navigate=useNavigate();

  return (
    <div className={style.NavBar}>
      <div className={style.NavBar_box}>
        <div className={style.NavBar_box_left}>
          <img src={img.logo3} alt="logo" width={50} height={50} />
        </div>
        <div className={style.NavBar_box_right}>
          {/* Desktop */}
          <div className={style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => {
                  setActive(i + 1)
                }}
                key={i + 1}
                className={`${style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? style.active_btn : ""
                }`}
              >
                <Link
                  to={el.link}
                  className={style.NavBar_box_right_menu_items_link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* mobile*/}
          {open && (
            <div className={style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => {
                    setActive(i + 1)
                  }}
                  key={i + 1}
                  className={`${style.mobile_menu_items} ${
                    active == i + 1 ? style.active_btn : ""
                  }`}
                >
                  <Link
                    to={el.link}
                    className={style.mobile_menu_items_link}
                  >
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={style.mobile_menu_btn}>
                <img src={img.close} alt="close" width={50} height={50} onClick={()=>setOpen(false)}/>
              </p>
            </div>
          )}

          {/* connect wallet  */}

          <div className={style.NavBar_box_right_connect}>
            {account==""?(
              <button onClick={()=>connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ):(
              <button onClick={()=>{setOpenModel(true)}}>
                {""}
                <img src={userName ? img.accountName:img.create2} alt="" width={20} height={20}/>
                {""}
                <small>{userName ||"Create Account"}</small>
              </button>
            )}
          </div>

          <div className={style.NavBar_box_right_open}
          onClick={()=>{setOpen(true)}}>
            <img src={img.open} alt="open" width={30} height={30} />
          </div>

        </div>
      </div>
      {openModel && (
        <div className={style.modelBox}>
          <Model 
            openBox={setOpenModel} 
            title="WELCOME TO" 
            head="CHAT BUDDY" 
            info='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat ipsa beatae nulla et ullam eum error aliquid exercitationem rerum. Ut?' 
            smallInfo="Kindley select your name..." 
            image={img.hero} 
            functionName={createAccount} 
            address={account}>
            navigate
          </Model>
        </div>

      )}
      {error==""?"":<Error error={error}></Error>}
    </div>
  )


}

export default NavBar