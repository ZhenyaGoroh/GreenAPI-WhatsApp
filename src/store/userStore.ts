import { create } from "zustand"

interface State {
  IdInstance: string
  ApiTokenInstance: string
  chats: Chat[]
}

type Chat = {
  receiverNumber: string
  messages: Message[]
}

type Message = {
  text: string
  sender: string
  timestamp: number
}

interface Action {
  setIdInstance: (newIdInstance: string) => void
  setApiTokenInstance: (newApiTokenInstance: string) => void
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

  chats: [{ receiverNumber: "123123", messages: [] }],
}))
