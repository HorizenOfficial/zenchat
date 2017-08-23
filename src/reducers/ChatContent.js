import { SELECT_CHAT_CONTENT } from '../actions/ChatContent'

var initialChatContent = {
  address: ''  
}

export default function ChatContentReducer (state=initialChatContent, action) {
  switch(action.type){
    case SELECT_CHAT_CONTENT:
      return {
        address: action.address
      }
    
    default:
      return state
  }
}