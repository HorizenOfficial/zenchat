import zencash from 'bitcoin'

export default function rpcCall(host, port, user, pass, timeout){
  var rpcClient = new zencash.Client({
    host: host,
    port: port,
    user: user,
    pass: pass,
    timeout: timeout
  })

  return rpcClient
}