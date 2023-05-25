import React, { useEffect, useRef, useState } from "react"
import { useNavigate, Route, Routes } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { RiChatNewFill } from "react-icons/ri"
import { IoArrowBack } from "react-icons/io5"
import s from "./Chats.module.scss"
import { useStore } from "../../store/userStore"
import Chat from "../../components/Chat/Chat"
import ChatBox from "../../components/ChatBox/ChatBox"

function Chats() {
  const navigate = useNavigate()
  const { IdInstance, ApiTokenInstance, addChat, chats } = useStore()
  const modalRef = useRef<HTMLDivElement>(null)

  const [addChatStatus, setAddChatStatus] = useState<boolean>(false)
  const [newChatNumber, setNewChatNumber] = useState<string>("")
  useEffect(() => {
    if (IdInstance.length < 1 || ApiTokenInstance.length < 1) {
      navigate("/registration")
    }
  })

  useEffect(() => {
    if (modalRef.current) {
      if (addChatStatus) {
        modalRef.current.style.left = "0"
      } else {
        modalRef.current.style.left = "-500px"
      }
    }
  }, [addChatStatus])

  return (
    <main className={s.chats}>
      <section className={s.chatsFeed}>
        <div className={s.chatsFeed__header}>
          <FaUserCircle size={40} fill="#e9edef" />
          <RiChatNewFill
            onClick={() => setAddChatStatus(true)}
            size={30}
            className={s.header__btn}
          />
        </div>
        <div ref={modalRef} className={s.chatsFeed__modal}>
          <div className={s.modal__header}>
            <IoArrowBack
              onClick={() => setAddChatStatus(false)}
              className={s.modal__header__icon}
            />
            <span>New chat</span>
          </div>
          <input
            value={newChatNumber}
            onChange={(e) => setNewChatNumber(e.target.value)}
            placeholder="Enter phone number"
            type="text"
            className={s.modal__input}
          />
          <button
            disabled={newChatNumber.length < 1}
            type="button"
            className={s.modal__btn}
            onClick={() => {
              addChat({ receiverNumber: newChatNumber, messages: [] })
              setNewChatNumber("")
              setAddChatStatus(false)
            }}
          >
            Add chat
          </button>
        </div>
        <div className={s.chatsFeed__feed}>
          <ChatBox />
        </div>
      </section>
      <section className={s.chatView}>
        <div>
          <Routes>
            <Route path="/*" element={<Chat />} />
          </Routes>
        </div>
      </section>
    </main>
  )
}

export default Chats