type Chat = {
  receiverNumber: string
  messages: Message[]
}

type Message = {
  text: string
  sender: string
  timestamp: number
}

export {}
