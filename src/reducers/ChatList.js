import {
  NEW_CHAT,
  SET_CHAT_NAME
} from '../actions/ChatSettings'

import { secretCodeToZAddr, secretCodeToWIFKey } from '../utils/zaddress'

const initialChats = [
  /*
   * chats should have the object type:
   * {
   *   secretCode: secretCode,
   *   chatName: chatName,
   *   address: address   
   * }
   */
]

export default function ChatListReducer(state=[], action){
  switch (action.type) {
    // TODO: RPC CALL and sync
    case NEW_CHAT:
      return [
        ...state,
        {
          secretCode: action.secretCode,
          chatName: '',
          address: secretCodeToZAddr(action.secretCode)
        }
      ]
    
    case SET_CHAT_NAME:
      return state.map(function(obj){
        if (obj.address === action.address) {
          return {
            secretCode: obj.secretCode,
            chatName: action.chatName,
            address: action.address
          }
        }
        return obj
      })

    default:
      return state
  }
}