export const SET_USER_NICKNAME = 'SET_USER_NICKNAME'
export const SET_SEND_ADDRESS = 'SET_SEND_ADDRESS'

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