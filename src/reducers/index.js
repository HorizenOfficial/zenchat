import { combineReducers } from 'redux'
import RPCSettingsReducer from './RPCSettings'
import UserSettingsReducer from './UserSettings'
import ChatListReducer from './ChatList'

const allReducers = combineReducers({
  rpcSettings: RPCSettingsReducer,
  userSettings: UserSettingsReducer,
  chatList: ChatListReducer
})

export default allReducers