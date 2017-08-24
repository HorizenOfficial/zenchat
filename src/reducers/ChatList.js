import {
  NEW_CHAT,
  SET_CHAT_NAME,
  DELETE_CHAT,
  SET_ADDRESS_NICKNAME
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
 *   address: address,
 *   nicknames: {
 *       'zaddress': 'nickname'
 *   }
 * }
 */
var initialChats = deterministicReadFile()

function ChatNickamesReducer(state={}, action){
  switch (action.type) {
    case SET_ADDRESS_NICKNAME:
      var v = {}
      v[action.senderAddress] = action.nickname
      return Object.assign({}, state, v)

    default:
      return state
  }
}

export default function ChatListReducer(state=initialChats, action){  
  switch (action.type) {    
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
          address: secretCodeToZAddr(action.secretCode),
          nicknames: ChatNickamesReducer({}, action)
        }
      ]
    
    case SET_CHAT_NAME:
      return state.map(function(obj){
        if (obj.address === action.address) {
          return {
            secretCode: obj.secretCode,
            chatName: action.chatName,
            address: action.address,
            nicknames: ChatNickamesReducer(obj.nicknames, action)
          }
        }
        return obj
      })

    case SET_ADDRESS_NICKNAME:
      return state.map(function(obj){
        if (obj.address === action.chatAddress) {
          return Object.assign({}, obj, {
            nicknames: ChatNickamesReducer(obj.nicknames, action)
          })
        }
        return obj
      })

    case DELETE_CHAT:      
      return state.filter((x) => x.address !== action.address)

    default:
      return state
  }
}