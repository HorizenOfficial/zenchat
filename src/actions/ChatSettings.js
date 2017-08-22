export const NEW_CHAT = 'NEW_CHAT'
export const SET_CHAT_NAME = 'SET_CHAT_NAME'

export function addNewChat (secretCode) {
  return {
    type: NEW_CHAT,
    secretCode
  }
}

export function setChatName (address, newChatName) {
  return {
    type: SET_CHAT_NAME,
    address,
    chatName: newChatName
  }
}