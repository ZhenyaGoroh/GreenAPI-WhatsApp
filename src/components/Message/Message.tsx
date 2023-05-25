import React from "react"
import s from "./Message.module.scss"

function Message({ sender, text }: { sender: boolean; text: string }) {
  return <div className={sender ? s.sender : s.receiver}>{text}</div>
}

export default Message
