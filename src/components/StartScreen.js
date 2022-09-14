import React from "react"
import logo from "../Images/think.png"

export default function StartScreen({start}){
  return (
    <div className="Title">
      Welcome To Trivia !
      <img className="Logo" src={logo} />
      <button className = "start" onClick={start}>Start</button>
    </div> 
  )
}