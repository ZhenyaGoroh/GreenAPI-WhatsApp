import React from "react"
import { FaRegUserCircle } from "react-icons/fa"
import s from "./ChatBox.module.scss"

function ChatBox({ chat, active }: { chat: Chat; active: boolean }) {
  return (
    <div className={active ? `${s.box} ${s.box_active}` : s.box}>
      <FaRegUserCircle size={40} />
      <div className={s.box__content}>
        <span className={s.content__number}>{chat.receiverNumber}</span>
        <span className={s.content__message}>
          {chat.messages.length > 0 ? (
            chat.messages[chat.messages.length - 1].text
          ) : (
            <i className={s.content__message_empty}>Write your first message</i>
          )}
        </span>
      </div>
    </div>
  )
}

export default ChatBox
