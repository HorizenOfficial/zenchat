import { SET_USER_NICKNAME, SET_SEND_ADDRESS } from '../actions/UserSettings'


const initialUserSettings = {
  nickname: 'Me',
  address: ''
}

export default function UserSettingsReducer (state=initialUserSettings, action){  
  switch(action.type){
    case SET_USER_NICKNAME:
      return Object.assign({}, state, {
        nickname: action.nickname
      })

    case SET_SEND_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })
    
    default:
      return state
  }
} 