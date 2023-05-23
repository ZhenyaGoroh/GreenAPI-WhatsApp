import { create } from "zustand"

interface State {
  IdInstance: string
  ApiTokenInstance: string
}

interface Action {
  setIdInstance: (newIdInstance: string) => void
  setApiTokenInstance: (newApiTokenInstance: string) => void
}

export const useStore = create<State & Action>((set) => ({
  IdInstance: "",
  ApiTokenInstance: "",
  setIdInstance: (newIdInstance: string) =>
    set(() => ({ IdInstance: newIdInstance })),
  setApiTokenInstance: (newApiTokenInstance: string) =>
    set(() => ({ ApiTokenInstance: newApiTokenInstance })),
}))
