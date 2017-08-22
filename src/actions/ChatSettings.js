export const NEW_CHAT = 'NEW_CHAT'
export const SET_CHAT_NAME = 'SET_CHAT_NAME'
export const DELETE_CHAT = 'DELETE_CHAT'

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

export function deleteChat (address) {
  return {
    type: DELETE_CHAT,
    address
  }
}