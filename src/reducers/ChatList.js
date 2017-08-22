import {
  NEW_CHAT,
  SET_CHAT_NAME,
  DELETE_CHAT
} from '../actions/ChatSettings'

import { secretCodeToZAddr, secretCodeToWIFKey } from '../utils/zaddress'
import { CHATLIST_FILE_LOCATION, FOLDER_LOCATION } from '../constants/storage'

import fs from 'fs'


// JavaScript's async nature is a big
// Nono here, don't wanna overwrite
// existing user settings
// Create file if it doesn't exist
function deterministicReadFile(){
  try { 
    var contents = fs.readFileSync(CHATLIST_FILE_LOCATION, 'utf8')
    return JSON.parse(contents)
  } catch (err) {
    if (!fs.existsSync(FOLDER_LOCATION)){
      fs.mkdirSync(FOLDER_LOCATION)
    }   
    fs.writeFileSync(CHATLIST_FILE_LOCATION)
    return []
  }
}

/*
 * a chatList contains a list of chats
 * chats should have the object type:
 * {
 *   secretCode: secretCode,
 *   chatName: chatName,
 *   address: address   
 * }
 */
var initialChats = deterministicReadFile()

export default function ChatListReducer(state=initialChats, action){  
  switch (action.type) {
    // TODO: RPC CALL and sync
    // Save settings to file
    case NEW_CHAT:
      // Don't add the same secret code
      if (state.filter((x) => x.secretCode === action.secretCode).length > 0){
        return state
      }
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

    case DELETE_CHAT:
      console.log(state)
      console.log(state.filter((x) => x.address !== action.address))
      return state.filter((x) => x.address !== action.address)

    default:
      return state
  }
}