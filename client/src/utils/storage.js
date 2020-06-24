/**
 * 存储数据
 * @param {String} key 键名
 * @param {String} value 字符串键值
 * @param {String} site 调用形式'session'为sessionStorage
 */
function setItem (key, value, site) {
  if (site && site === 'session') {
    sessionStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * 读取数据
 * @param {String} key 键名
 * @param {String} site 调用形式'session'为sessionStorage
 */
function getItem (key, site) {
  if (site && site === 'session') {
    return sessionStorage.getItem(key)
  } else {
    return localStorage.getItem(key)
  }
}

/**
 * 删除数据
 * @param {String} key 键名
 * @param {String} site 调用形式'session'为sessionStorage
 */
function removeItem (key, site) {
  if (site && site === 'session') {
    sessionStorage.removeItem(key)
  } else {
    localStorage.removeItem(key)
  }
}

/**
 * 清空全部数据
 * @param {String} site 调用形式'session'为sessionStorage
 */
function clearStorage (site) {
  if (site && site === 'session') {
    sessionStorage.clear()
  } else {
    localStorage.clear()
  }
}

export default {
  setItem,
  getItem,
  removeItem,
  clearStorage
}