import { combineReducers } from 'redux'
import RPCSettingsReducer from './RPCSettings'
import UserSettingsReducer from './UserSettings'

const allReducers = combineReducers({
  rpcSettings: RPCSettingsReducer,
  userSettings: UserSettingsReducer
})

export default allReducers