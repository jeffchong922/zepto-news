function tplReplace (strHtml, replaceObj) {
  return strHtml.replace(/{{(.*?)}}/g, function (node, key) {
    return replaceObj[key]
  })
}

function getTarget (event) {
  var e = event || window.event
  return e.target || e.srcElement
}

function getCurTarget (event) {
  var e = event || window.event
  return e.currentTarget
}

function getQueryData (key) {
  var reg = new RegExp('(?:|&)' + key + '=([^&]*)(?:|&)', 'i'),
      valueArr = window.location.search.substr(1).match(reg)

  return valueArr == null ? '' : decodeURIComponent(valueArr[1])
}

export {
  tplReplace,
  getTarget,
  getCurTarget,
  getQueryData
}