import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { RiChatNewFill } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoArrowBack } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { v4 as uuidv4 } from "uuid"
import s from "./Chats.module.scss"
import { useStore } from "../../store/userStore"
import Chat from "../../components/Chat/Chat"
import ChatBox from "../../components/ChatBox/ChatBox"

function Chats() {
  const navigate = useNavigate()
  const { IdInstance, ApiTokenInstance, addChat, chats, addMessage } =
    useStore()
  const modalRef = useRef<HTMLDivElement>(null)
  const chatsFeedRef = useRef<HTMLDivElement>(null)
  const chatsViewRef = useRef<HTMLDivElement>(null)

  const [addChatStatus, setAddChatStatus] = useState<boolean>(false)
  const [newChatNumber, setNewChatNumber] = useState<string>("")
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>()
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false)

  const [first, setFirst] = useState("")

  const handleActiveBoxIndex = useCallback((index: number) => {
    setActiveBoxIndex(index)
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiTokenInstance}`
      )
      if (response.ok) {
        const data = await response.json()

        if (data !== null) {
          const sender = data.body.senderData.sender.slice(0, -5)
          const { timestamp } = data.body
          const { textMessage } = data.body.messageData.textMessageData

          if (
            chats.filter((chat) => chat.receiverNumber === sender).length !==
              0 &&
            chats
              .filter((chat) => chat.receiverNumber === sender)[0]
              .messages.filter(
                (mes) =>
                  mes.timestamp === timestamp &&
                  mes.sender === sender &&
                  mes.text === textMessage
              ).length === 0
          ) {
            addMessage({ text: textMessage, sender, timestamp }, sender)
          } else if (
            chats.filter((chat) => chat.receiverNumber === sender).length === 0
          ) {
            // console.log(chats.filter((chat) => chat.receiverNumber === sender))

            await addChat({
              receiverNumber: sender,
              messages: [{ text: textMessage, sender, timestamp }],
            })
            setFirst("asda")
            // console.log(first)
          }

          await fetch(
            `https://api.green-api.com/waInstance${IdInstance}/deleteNotification/${ApiTokenInstance}/${data.receiptId}`,
            {
              method: "DELETE",
            }
          )
        }
      }
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (IdInstance.length < 1 || ApiTokenInstance.length < 1) {
      navigate("/GreenAPI-WhatsApp/registration")
    }
    localStorage.setItem("chats", JSON.stringify(chats))
    if (modalRef.current) {
      if (addChatStatus) {
        modalRef.current.style.left = "0"
      } else {
        modalRef.current.style.left = `-${modalRef.current.offsetWidth + 100}px`
      }
    }
    if (window.innerWidth < 1000) {
      if (chatsFeedRef.current) {
        chatsFeedRef.current.style.width = `${chatsViewRef.current?.offsetWidth}px`
        if (burgerOpen) {
          chatsFeedRef.current.style.left = "4rem"
        } else {
          chatsFeedRef.current.style.left = `-${
            chatsFeedRef.current.offsetWidth + 20
          }px`
        }
      }
    }
  })

  return (
    <main className={s.chats}>
      <div className={s.burger}>
        <div className={s.burger__header}>
          {!burgerOpen ? (
            <GiHamburgerMenu
              onClick={() => setBurgerOpen(true)}
              size={30}
              fill="#e9edef"
              className={s.burger__icon}
            />
          ) : (
            <IoMdClose
              onClick={() => setBurgerOpen(false)}
              size={40}
              fill="#e9edef"
              className={s.burger__icon}
            />
          )}
        </div>
      </div>
      <section ref={chatsFeedRef} className={s.chatsFeed}>
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
              if (
                chats.filter((c) => c.receiverNumber === newChatNumber)
                  .length === 0
              ) {
                addChat({ receiverNumber: newChatNumber, messages: [] })
              }
              setNewChatNumber("")
              setAddChatStatus(false)
            }}
          >
            Add chat
          </button>
        </div>
        <div className={s.chatsFeed__feed}>
          {chats.map((chat, index) => (
            <Link
              state={chat}
              key={uuidv4()}
              to={`/GreenAPI-WhatsApp/${chat.receiverNumber}`}
              onClick={() => setActiveBoxIndex(index)}
            >
              <ChatBox active={activeBoxIndex === index} chat={chat} />
            </Link>
          ))}
        </div>
      </section>
      <section ref={chatsViewRef} className={s.chatsView}>
        <Routes>
          <Route
            path="/*"
            element={<Chat handleActiveBoxIndex={handleActiveBoxIndex} />}
          />
        </Routes>
      </section>
    </main>
  )
}

export default Chats
