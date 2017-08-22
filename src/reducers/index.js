import { combineReducers } from 'redux'
import RoomSettingsReducer from './Rooms'

const allReducers = combineReducers({
  potatoes: RoomSettingsReducer
})

export default allReducers