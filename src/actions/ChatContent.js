export const SELECT_CHAT_CONTENT = 'SELECT_CHAT_ADDRESS'

export function selectChatContent (address) {
  return {
    type: SELECT_CHAT_CONTENT,
    address
  }
}