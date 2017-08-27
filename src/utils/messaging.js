import utf8 from 'utf8'

import rpcCall from './rpc'

function hexToString(hex) {
  const utf8_str = Buffer.from(hex, 'hex').toString('utf8')
  const normalized_utf8_str = utf8_str.replace(/\0/g, '') // Remove null characters  
  return utf8.decode(normalized_utf8_str)  // Decode it
}

function stringToHex(str) {
  const utf8_str = utf8.encode(str)  
  return Buffer.from(utf8_str, 'utf8').toString('hex')
}

// Converts a memo (string)
// to a zenmsg (obj)
// if there is none, return undefined
function memoToZenMsg(memo){
  var zenmsg
  
  // ZEN Messaging Protocol v1
  // Need to put this into another file soon
  try {            
    var obj = JSON.parse(hexToString(memo))
    
    if (obj.zenmsg === undefined)
      throw "invalid zenmsg"

    zenmsg = obj.zenmsg      

    if (zenmsg.ver === undefined ||
        zenmsg.from === undefined ||
        zenmsg.message === undefined ||
        zenmsg.sign === undefined){
      throw "invalid zenmsg"
    }
    return zenmsg

  } catch (err) {    
    return undefined
  }
}

module.exports = {
  hexToString: hexToString,
  stringToHex: stringToHex,
  memoToZenMsg: memoToZenMsg
}