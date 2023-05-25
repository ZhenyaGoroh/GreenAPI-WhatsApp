import React from "react"
import { FaRegUserCircle } from "react-icons/fa"
import s from "./ChatBox.module.scss"

function ChatBox() {
  return (
    <div className={s.box}>
      <FaRegUserCircle size={40} />
      <div className={s.box__content}>
        <span className={s.content__number}>12341234</span>
        <span className={s.content__message}>Hi</span>
      </div>
    </div>
  )
}

export default ChatBox
