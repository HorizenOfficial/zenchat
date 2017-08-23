import { combineReducers } from 'redux'
import RPCSettingsReducer from './RPCSettings'
import UserSettingsReducer from './UserSettings'
import ChatListReducer from './ChatList'
import ChatContentReducer from './ChatContent'

const allReducers = combineReducers({
  rpcSettings: RPCSettingsReducer,
  userSettings: UserSettingsReducer,
  chatList: ChatListReducer,
  chatContent: ChatContentReducer
})

export default allReducers