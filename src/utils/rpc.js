import zencash from 'bitcoin'

// Just a helper function so I don't
// have to keep instantiating a 'new' object
// super annoying
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

export function rpcCallPromise(host, port, user, pass, timeout){
  return new zencash.Client({
    host,
    port,
    user,
    pass,
    timeout
  })
}