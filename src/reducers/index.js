import { combineReducers } from 'redux'
import RoomSettingsReducer from './Rooms'

const allReducers = combineReducers({
  dialogOpen: RoomSettingsReducer
})

export default allReducers