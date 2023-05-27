/* eslint-disable no-nested-ternary */
import React from "react"
import { FaRegUserCircle } from "react-icons/fa"
import s from "./ChatBox.module.scss"
import { TChat } from "../../types/types"

function ChatBox({ chat, active }: { chat: TChat; active: boolean }) {
  return (
    <div className={active ? `${s.box} ${s.box_active}` : s.box}>
      <FaRegUserCircle size={40} />
      <div className={s.box__content}>
        <span className={s.content__number}>{chat.receiverNumber}</span>
        <span className={s.content__message}>
          {chat.messages.length > 0 ? (
            chat.messages[chat.messages.length - 1].text.length > 30 ? (
              `${chat.messages[chat.messages.length - 1].text.slice(0, 30)}...`
            ) : (
              chat.messages[chat.messages.length - 1].text
            )
          ) : (
            <i className={s.content__message_empty}>Write your first message</i>
          )}
        </span>
      </div>
    </div>
  )
}

export default ChatBox
