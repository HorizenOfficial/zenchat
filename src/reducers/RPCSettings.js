import { 
  SET_RPC_HOST,
  SET_RPC_PASSWORD,
  SET_RPC_USERNAME,
  SET_RPC_PORT  
} from '../actions/RPCSettings'

const initialRPCSettings = {
  rpcUsername: '',
  rpcPassword: '',
  rpcHost: '',
  rpcPort: ''
}

export default function RPCSettingsReducer (state=initialRPCSettings, action) {  
  switch (action.type) {
    case SET_RPC_HOST:      
      return Object.assign({}, state, {rpcHost: action.rpcHost})

    case SET_RPC_PORT:
      return Object.assign({}, state, {rpcPort: action.rpcPort})

    case SET_RPC_USERNAME:
      return Object.assign({}, state, {rpcUsername: action.rpcUsername})

    case SET_RPC_PASSWORD:
      return Object.assign({}, state, {rpcPassword: action.rpcPassword})

    default:
      return state
  }
}