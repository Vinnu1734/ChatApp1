import React from 'react'
import style from "./Error.module.css"

function Error({error}) {
  return (
    <div className={style.Error}>
      <div className={style.Error_box}>
        <h1> {error}</h1>
      </div>
    </div>
  )
}

export default Error