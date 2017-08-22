import electron from 'electron'

import path from 'path'

// Stroage location
export const FOLDER_NAME = 'zenchat'
export const FOLDER_LOCATION = path.join(electron.remote.app.getPath('appData'), FOLDER_NAME)

export const CONFIG_FILENAME = 'config.json'
export const CONFIG_FILE_LOCATION = path.join(FOLDER_LOCATION, CONFIG_FILENAME)

export const CHATLIST_FILENAME = 'chatlist.json'
export const CHATLIST_FILE_LOCATION = path.join(FOLDER_LOCATION, CHATLIST_FILENAME)