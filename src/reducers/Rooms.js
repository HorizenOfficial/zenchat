import { HANDLE_DIALOG_CLOSE, HANDLE_DIALOG_OPEN } from '../actions/Rooms'

const initialRoomState = false

export default function RoomSettingsReducer (state=initialRoomState, action) {
  switch (action.type) {
    case HANDLE_DIALOG_CLOSE:
    case HANDLE_DIALOG_OPEN:      
      return action.dialogOpen

    default:
      return state
  }
}