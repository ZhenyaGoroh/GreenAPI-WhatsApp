import { create } from "zustand"

interface State {
  IdInstance: string
  ApiTokenInstance: string
  chats: Chat[]
}

interface Action {
  setIdInstance: (newIdInstance: string) => void
  setApiTokenInstance: (newApiTokenInstance: string) => void
  addChat: (newChat: Chat) => void
  addMessage: (newMessage: Message, receiverNumber: string) => void
}

export const useStore = create<State & Action>((set) => ({
  IdInstance:
    document.cookie.length > 1
      ? document.cookie.split("; ")[0].split("=")[1]
      : "",
  ApiTokenInstance:
    document.cookie.length > 1
      ? document.cookie.split("; ")[1].split("=")[1]
      : "",
  setIdInstance: (newIdInstance: string) =>
    set(() => ({ IdInstance: newIdInstance })),
  setApiTokenInstance: (newApiTokenInstance: string) =>
    set(() => ({ ApiTokenInstance: newApiTokenInstance })),

  chats: (() => {
    const storedResults = localStorage.getItem("chats")
    return storedResults !== null ? JSON.parse(storedResults) : []
  })(),
  addChat: (newChat: Chat) =>
    set((state) => ({ chats: [...state.chats, newChat] })),
  addMessage: (newMessage: Message, receiverNumber: string) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.receiverNumber === receiverNumber
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
          : chat
      ),
    })),
}))
