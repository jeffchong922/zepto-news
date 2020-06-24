module.exports = class NewsDataCache {
  constructor () {
    this.newsDataCache = {}
  }

  setData (field, data) {
    this.newsDataCache[field] = data
  }

  getData (field) {
    return this.newsDataCache[field] || null
  }

  removeData (field) {
    delete this.newsDataCache[field]
  }

  clearData () {
    this.newsDataCache = {}
  }
}