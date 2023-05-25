import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import s from "./Chat.module.scss"
import { useStore } from "../../store/userStore"

function Chat({
  handleActiveBoxIndex,
}: {
  handleActiveBoxIndex: (index: number) => void
}) {
  const { chats } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  let chat: Chat
  if (location.state) {
    chat = location.state
  } else {
    chat = { receiverNumber: "", messages: [] }
  }

  useEffect(() => {
    if (
      chats.filter((c) => c.receiverNumber === chat.receiverNumber).length === 0
    ) {
      navigate("/")
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].receiverNumber === chat.receiverNumber) {
        handleActiveBoxIndex(i)
        break
      }
    }
  })

  const [message, setMessage] = useState<string>("")
  return (
    <div className={s.chat}>
      <div className={s.chat__header}>
        <FaUserCircle size={50} />
        <span className={s.header__number}>{chat.receiverNumber}</span>
      </div>
      <div className={s.chat__view}>
        <div className={s.view__messages} />
        <div className={s.view__input}>
          <div className={s.input__wrapper}>
            <textarea
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={s.input__field}
            />
            <button
              disabled={message.length < 1}
              type="button"
              className={s.input__btn}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
