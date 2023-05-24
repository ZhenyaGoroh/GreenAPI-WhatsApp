import React, { useEffect, useState } from "react"
import { useNavigate, Route, Routes } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { RiChatNewFill } from "react-icons/ri"
import { IoArrowBack } from "react-icons/io5"
import s from "./Chats.module.scss"
import { useStore } from "../../store/userStore"
import Chat from "../../components/Chat/Chat"

function Chats() {
  const navigate = useNavigate()
  const { IdInstance, ApiTokenInstance } = useStore()

  const [addChatStatus, setAddChatStatus] = useState<boolean>(false)
  useEffect(() => {
    if (IdInstance.length < 1 || ApiTokenInstance.length < 1) {
      navigate("/registration")
    }
  })

  return (
    <main className={s.chats}>
      <section className={s.chatsFeed}>
        <div className={s.chatsFeed__header}>
          <FaUserCircle size={40} fill="#e9edef" />
          <RiChatNewFill size={30} className={s.header__btn} />
        </div>
        <div className={s.chatsFeed__modal}>
          <div className={s.modal__header}>
            <IoArrowBack className={s.modal__header__icon} />
            <span>New chat</span>
          </div>
          <input
            placeholder="Enter phone number"
            type="text"
            className={s.modal__input}
          />
          <button type="button" className={s.modal__btn}>
            Add chat
          </button>
        </div>
        <div className={s.chatsFeed__feed} />
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
