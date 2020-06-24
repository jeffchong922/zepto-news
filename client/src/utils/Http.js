const doAjax = Symbol('doAjax')

class Http {
  ajax (opt) {
    this[doAjax](opt)
  }

  [doAjax] (options) {
    let o = window.XMLHttpRequest ?
            new XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP')
    if (!o) {
      throw new Error('您的浏览器不支持异步发起HTTP请求')
    }

    let opt = options || {},
        type = (opt.type || 'GET').toUpperCase(),
        async = !!opt.async ? false : true,
        dataType = (opt.dataType || 'JSON').toUpperCase(),
        jsonp = opt.jsonp || 'callback',
        jsonpCallback = opt.jsonpCallback || 'jQuery' + this.randomNumber(),
        url = options.url,
        data = opt.data || null,
        timeout = opt.timeout || 30000,
        error = opt.error || function () {},
        success = opt.success || function () {},
        complete = opt.complete || function () {},
        t = null

    if (!url) {
      throw new Error('您没有填写URL')
    }

    if (dataType === 'JSONP' && type !== 'GET') {
      throw new Error('如果dataType为JSONP，type请您设置为GET或修改dataType')
    }

    if (dataType === 'JSONP') {
      /* 防止端数据请求错误 */
      t = setTimeout(() => {
        error()
        clearTimeout(t)
        t = null
      }, timeout)

      window[jsonpCallback] = function (data) {
        clearTimeout(t)
        t = null
        success(data)
      }
      var jsonpUrl = url.indexOf('?') === -1
                    ? url + '?' + jsonp + '=' + jsonpCallback
                    : url + '&' + jsonp + '=' + jsonpCallback
      var oScript = document.createElement('script')
      oScript.setAttribute('type', 'text/javascript')
      oScript.setAttribute('src', jsonpUrl)

      document.body.appendChild(oScript)
      document.body.removeChild(oScript)
      return
    }

    o.onreadystatechange = () => {
      if (o.readyState === 4) {
        if (o.status >= 200 && o.status < 300) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(o.responseText))
              break
            case 'TEXT':
              success(o.responseText)
              break
            case 'XML':
              success(o.responseXML)
            default:
              success(JSON.parse(o.responseText))
          }
        } else {
          error()
        }
        complete()
        clearTimeout(t)
        t = null
        o = null
      }
    }

    o.open(type, url, async)

    type === 'POST' && o.setRequestHeader('Content-type', 'x-www-form-urlencoded')
    o.send(type === 'GET' ? null : this.formatData(data))

    t = setTimeout(() => {
      o.abort()
      clearTimeout(t)
      t = null
      o = null
      throw new Error('本次请求已超时，API地址：' + url)
    }, timeout)
  }

  post (url, data, dataType, successCB, errorCB, completeCB) {
    this[doAjax]({
      type: 'POST',
      url: url,
      data: data,
      dataType: dataType,
      success: successCB,
      error: errorCB,
      complete: completeCB
    })
  }

  get (url, dataType, successCB, errorCB, completeCB) {
    this[doAjax]({
      type: 'GET',
      url: url,
      dataType: dataType,
      success: successCB,
      error: errorCB,
      complete: completeCB
    })
  }

  formatData (obj) {
    var str = ''
    for (var key in obj) {
      str += key + '=' + obj[key] + '&'
    }
    return str.replace(/&$/, '')
  }

  randomNumber () {
    var num = ''
    for(var i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10)
    }
    return num
  }
}

export default Http