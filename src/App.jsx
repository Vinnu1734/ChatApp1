import React, { useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChatAppContext } from "../Context/ChatAppContext.jsx"
import { Filter, Friend, NavBar } from "../components/Index"
import "./App.css"
import AllUser from "./AllUser.jsx"
import Payment from "../components/Payment/Payment.jsx"

function App() {
 const {readMessage,createAccount,addFriends,sendMessage,readUser}=useContext(ChatAppContext);

  return (
    <BrowserRouter>
      <NavBar />
      <Filter></Filter>
      {/* <Friend></Friend> */}
      <Routes>
        {/* <Route
          path="/"
          element={<h2 className="poppins-regular"></h2>}
        /> */}
        <Route path='/' element={<Friend></Friend>} />
        <Route path='/allUser' element={<AllUser></AllUser>} />
        <Route path='/payment' element={<Payment></Payment>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
