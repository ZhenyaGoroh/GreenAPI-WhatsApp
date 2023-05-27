export type TChat = {
  receiverNumber: string
  messages: TMessage[]
}

export type TMessage = {
  text: string
  sender: string
  timestamp: number
}
