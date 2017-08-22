export const SET_USER_NICKNAME = 'SET_USER_NICKNAME'

export function setUserNickname (nickname='Me'){
  return {
    type: SET_USER_NICKNAME,
    nickname
  }
}