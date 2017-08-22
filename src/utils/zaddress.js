import zencashjs from 'zencashjs'

function secretCodeToWIFKey(secretCode) {
  var z_secretkey = zencashjs.zaddress.mkZSecretKey(secretCode)
  return zencashjs.zaddress.zSecretKeyToSpendingKey(z_secretKey)
}

function secretCodeToZAddr(secretCode) {
  var z_secretKey = zencashjs.zaddress.mkZSecretKey(secretCode)

  // spending key (wif)
  var spending_key = zencashjs.zaddress.zSecretKeyToSpendingKey(z_secretKey)

  // paying key
  var a_pk = zencashjs.zaddress.zSecretKeyToPayingKey(z_secretKey)

  var pk_enc = zencashjs.zaddress.zSecretKeyToTransmissionKey(z_secretKey)
  
  // z address
  return zencashjs.zaddress.mkZAddress(a_pk, pk_enc)
}

module.exports = {
  secretCodeToWIFKey: secretCodeToWIFKey,
  secretCodeToZAddr: secretCodeToZAddr
}