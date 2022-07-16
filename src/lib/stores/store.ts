import { writable } from "svelte/store";
type User = {
  id: string,
  avatar: string,
  username: any,
  email: string,
  token: string,
  servers: object[],
}
export const user = writable<User>({
  id: '',
  avatar: '',
  username: '',
  email: '',
  token: '',
  servers: [],
})
export const discordUser = writable({})
export const userName = writable<string>("")
export const selectedTab = writable<string>("FIRST_TAB")
export const FIRST_TAB = "FIRST_TAB";
export const SECOND_TAB = "SECOND_TAB";
export const ACTIVE_TAB = 'inline-block p-4 text-blue-400 bg-gray-100 rounded-t-lg'
export const UNACTIVE_TAB = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ";

export const isLoading = writable<boolean>(true)
export const isLoadingScreen = writable<boolean>(true)
export const isCreatingRoom = writable<boolean>(false)
export const roomCode = writable<string>("")
export const activeConversation = writable<string>("")
export const isRandomUser = writable<boolean>(false)

export const accessToken = writable<string>("")
export const activeChat = writable<string>("")
export const topics = writable<string[]>([])
export const error = writable<string>("")
export const hasError = writable<boolean>(false)