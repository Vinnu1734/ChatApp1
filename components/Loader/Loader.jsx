import React from 'react'
import style from "./Loader.module.css"
import img from "../../assets/index"

function Loader() {
  return (
    <div className={style.Loader}>
      <div className={style.Loader_box}>
        <img src={img.loader} alt="loader" width={100} height={100} />
      </div>
    </div>
  )
}

export default Loader