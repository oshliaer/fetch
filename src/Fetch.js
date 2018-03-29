;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['b'], factory)
  } else {
    root.Fetch = factory(root.b)
  }
})(typeof self !== 'undefined' ? self : this, function(b) {
  var genParams = function(params, method) {
    params = params || {}
    params.method = method ? method : 'get'
    params.muteHttpExceptions =
      params.muteHttpExceptions === false ? params.muteHttpExceptions : true
    params.headers = params.headers || {}
    params.headers.Authorization = params.headers.Authorization
      ? params.headers.Authorization
      : 'Bearer ' + ScriptApp.getOAuthToken()
    if (method === 'post' || method === 'put') {
      if (!params.contentType) {
        params.contentType = 'application/json'
        params.payload =
          typeof params.payload === 'object'
            ? JSON.stringify(params.payload)
            : params.payload
      }
    }
    return params
  }

  var fetch = function(url, params) {
    Logger.log(url)
    Logger.log(params)
    return UrlFetchApp.fetch(url, params)
  }

  var get = function(url, params) {
    var p = genParams(params)
    return fetch(url, p)
  }
  var post = function(url, params) {
    var p = genParams(params, 'post')
    return fetch(url, p)
  }
  var put = function(url, params) {
    var p = genParams(params, 'put')
    return fetch(url, p)
  }

  return {
    get: get,
    post: post,
    put: put
  }
})
