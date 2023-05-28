import React, { useState, useEffect, KeyboardEvent, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { v4 as uuidv4 } from "uuid"
import s from "./Chat.module.scss"
import { useStore } from "../../store/userStore"
import Message from "../Message/Message"
import { TChat } from "../../types/types"

function Chat({
  handleActiveBoxIndex,
}: {
  handleActiveBoxIndex: (index: number) => void
}) {
  const { chats, addMessage, IdInstance, ApiTokenInstance, number, setNumber } =
    useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>("")
  let chat: TChat
  if (location.state) {
    chat = location.state
  } else {
    chat = { receiverNumber: "", messages: [] }
  }

  const sendMessage = () => {
    fetch(
      `https://api.green-api.com/waInstance${IdInstance}/sendMessage/${ApiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: `${chat.receiverNumber}@c.us`,
          message,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`${response.status}`)
      })
      .then(() => {
        addMessage(
          {
            text: message,
            sender: number,
            timestamp: Date.now(),
          },
          chat.receiverNumber
        )
      })
      .catch((error) => {
        console.error(error)
      })
    setMessage("")
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (number.length === 0) {
      fetch(
        `https://api.green-api.com/waInstance${IdInstance}/getSettings/${ApiTokenInstance}`
      )
        .then((response) => response.json())
        .then((data) => {
          setNumber(data.wid)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [IdInstance, ApiTokenInstance, number, setNumber])

  useEffect(() => {
    if (
      chats.filter((c) => c.receiverNumber === chat.receiverNumber).length === 0
    ) {
      navigate("/GreenAPI-WhatsApp/")
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].receiverNumber === chat.receiverNumber) {
        handleActiveBoxIndex(i)
        break
      }
    }
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [navigate, chat.receiverNumber, chats, handleActiveBoxIndex])

  return (
    <div className={s.chat}>
      <div className={s.chat__header}>
        <FaUserCircle size={50} />
        <span className={s.header__number}>{chat.receiverNumber}</span>
      </div>
      <div className={s.chat__view}>
        <div className={s.view__messages}>
          <div ref={messagesRef} className={s.view__messages_content}>
            {chats
              .filter((c) => c.receiverNumber === chat.receiverNumber)
              .map(
                (filteredChat) =>
                  filteredChat.messages && // Добавляем проверку наличия свойства messages
                  filteredChat.messages.map((mes) => (
                    <Message
                      key={uuidv4()}
                      text={mes.text}
                      sender={mes.sender === number}
                    />
                  ))
              )}
          </div>
        </div>
        <div className={s.view__input}>
          <div className={s.input__wrapper}>
            <textarea
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={s.input__field}
              onKeyDown={(e) => {
                handleKeyDown(e)
              }}
            />
            <button
              disabled={message.length < 1}
              type="button"
              className={s.input__btn}
              onClick={() => {
                sendMessage()
              }}
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
