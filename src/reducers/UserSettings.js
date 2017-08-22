import { SET_USER_NICKNAME } from '../actions/UserSettings'

const initialUserSettings = {
  'nickname': 'Me'  
}

export default function UserSettingsReducer (state=initialUserSettings, action){  
  switch(action.type){
    case SET_USER_NICKNAME:
      return {
        nickname: action.nickname
      }
    
    default:
      return state
  }
} 