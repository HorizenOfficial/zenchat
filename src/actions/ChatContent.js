export const SELECT_CHAT_CONTENT = 'SELECT_CHAT_ADDRESS'
export const ADD_SENDER_ADDRESS = 'SET_CHAT_CONTENT'

export function selectChatContent (address) {
  return {
    type: SELECT_CHAT_CONTENT,
    address
  }
}

export function addSenderAddress (senderAddress) {
  return {
    type: ADD_SENDER_ADDRESS,
    senderAddress
  }
}