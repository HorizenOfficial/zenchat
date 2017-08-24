export const SET_USER_NICKNAME = 'SET_USER_NICKNAME'
export const SET_SEND_ADDRESS = 'SET_SEND_ADDRESS'
export const SET_USER_SETTINGS = 'SET_USER_SETTINGS'

export function setUserNickname (nickname='Me'){
  return {
    type: SET_USER_NICKNAME,
    nickname
  }
}

export function setSendAddress (address) { 
  return {
    type: SET_SEND_ADDRESS,
    address
  }
}

export function setUserSettings (userSettings) {
  return {
    type: SET_USER_SETTINGS,
    userSettings
  }
}