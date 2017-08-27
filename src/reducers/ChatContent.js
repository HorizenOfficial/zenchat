import { SELECT_CHAT_CONTENT, ADD_SENDER_ADDRESS } from '../actions/ChatContent'

var initialChatContent = {
  address: '',
  senderAddress: []  // Who are the participants in the current chat
}

export default function ChatContentReducer (state=initialChatContent, action) {
  switch(action.type){
    case SELECT_CHAT_CONTENT:
      return {
        address: action.address,
        senderAddress: []
      }

    case ADD_SENDER_ADDRESS:      
      const addresses = state.senderAddress.concat(action.senderAddress)
      const uniqueAddresses = addresses.filter(function(item, pos){
        return (addresses.indexOf(item) === pos)
      })      
      return Object.assign({}, state, {
        senderAddress: uniqueAddresses
      })
    
    default:
      return state
  }
}