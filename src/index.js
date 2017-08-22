import React from 'react';
import ReactDOM from 'react-dom';
import electron from 'electron'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import allReducers from './reducers/index'
import App from './containers/App';

import { CONFIG_FILE_LOCATION, CHATLIST_FILE_LOCATION, FOLDER_LOCATION } from './constants/storage'
import fs from 'fs'

// Reducer store
const store = createStore(allReducers)

// Saving settings (side effects, ugh)
store.subscribe(() =>{
  // Current state
  const state = store.getState()

  // make folder if doesn't exist
  if (!fs.existsSync(FOLDER_LOCATION)){
    fs.mkdirSync(FOLDER_LOCATION)
  }
  
  // Settings
  const _settings = { rpcSettings: state.rpcSettings, userSettings: state.userSettings }
  fs.writeFile(CONFIG_FILE_LOCATION, JSON.stringify(_settings, null, 4), 'utf8', function onRead(err, data){
    if (err){
      alert(err);
    }    
  })   

  // ChatList
  if (state.chatList.length > 0){    
    fs.writeFile(CHATLIST_FILE_LOCATION, JSON.stringify(state.chatList, null, 4), 'utf8', function onRead(err, data){
      if (err){
        alert(err);
      }    
    })
  }
})

// Now we can render our application into it
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
