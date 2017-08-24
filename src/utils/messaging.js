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


module.exports = {
  hexToString: hexToString,
  stringToHex: stringToHex
}