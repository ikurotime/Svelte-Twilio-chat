import { writable } from "svelte/store";
type User = {
  id: string,
  avatar: string,
  username: any,
  email: string,
  access_token: string,
  servers: object[],
}
export const user = writable<User>({
  id: '',
  avatar: '',
  username: '',
  email: '',
  access_token: '',
  servers: [],
})
export const discordUser = writable({})
export const userName = writable<string>("")

export const isLoading = writable<boolean>(false)
export const isLoadingScreen = writable<boolean>(false)
export const isChatLoading = writable<boolean>(false)

export const roomCode = writable<string>("")
export const activeConversation = writable<string>("")
export const isRandomUser = writable<boolean>(false)
export const isInvited = writable<boolean>(false)

export const lastAccessToken = writable<string>("")
export const activeChat = writable<string>("")
export const selectedChat = writable<string>("")
export const topics = writable<string[]>([])
export const error = writable<string>("")
export const hasError = writable<boolean>(false)
export const notification = writable<string>("")
export const hasNotification = writable<boolean>(false)
export const serverInviteLink = writable<string>("")
export const currentServerData  = writable<object>({})
export const inviteCode = writable<string>("")

export const colorNames = writable<string[]>([
  "text-green-500",
  "text-blue-500",
  "text-red-500",
  "text-yellow-500",
  "text-orange-500",
  "text-purple-500",
  "text-indigo-500",
  "text-pink-500",
  "text-teal-500",
  "text-cyan-500",
  "text-green-500",
  "text-blue-500",
  "text-red-500",
  "text-yellow-500",
  "text-orange-500",
  "text-purple-500",
  "text-indigo-500",
  "text-pink-500",
  "text-teal-500",
  "text-cyan-500",
  "text-green-500",
  "text-blue-500",
  "text-red-500",
  "text-yellow-500",
  "text-orange-500",
  "text-purple-500",
  "text-indigo-500",
  "text-pink-500",
  "text-teal-500",
  "text-cyan-500",
])