import React from "react"
import { useLocation } from "react-router-dom"
import s from "./Chat.module.scss"

function Chat() {
  const location = useLocation()
  let chat: Chat
  if (location.state) {
    chat = location.state
  } else {
    chat = { receiverNumber: "", messages: [] }
  }

  return <div>{chat.receiverNumber}</div>
}

export default Chat
