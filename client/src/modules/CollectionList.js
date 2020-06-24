import contentItem from '../components/content/item'

import { getCurTarget } from '../utils/tools'
import { OPT } from '../utils/config'
import storage from '../utils/storage'
import item from '../components/content/item'

export default class ContentList {
  constructor ($, lazyLoad) {
    this.$ = $
    this.$content = $('.J_content')
    this.$contentList = this.$content.find('.content-list')
    this.contentItemComponent = contentItem()

    this.lazyLoad = lazyLoad
    this.collections = JSON.parse(storage.getItem('collections')) || {}
  }

  init () {
    this._render()
    this._bindEvent()
  }
  
  _render () {
    this._renderLoading()
    this._renderData()
  }

  _bindEvent () {
    this.$contentList.on('click', '.content-item', this.$.proxy(this._onItemClick, this))
  }

  _onItemClick (e) {
    const target = getCurTarget(e),
          newsUrl = target.getAttribute('data-url'),
          uniqueKey = target.getAttribute('data-uniquekey'),
          newsData = this.collections[uniqueKey]

    this._toDetailPage (newsUrl, newsData, uniqueKey)
  }
  _toDetailPage (url, data, uniqueKey) {
    storage.setItem('news-data', JSON.stringify(data), 'session')
    window.location.href = `detail.html?news_url=${url}&uniqueKey=${uniqueKey}&redirect=collection`
  }

  _renderData () {
    const data = this._getCollectionsData()
    this.$contentList.html(this.contentItemComponent.tpl(data, null, OPT.COLLECTION_LOADING_OPT))
    this.lazyLoad.setImgs()
  }

  _getCollectionsData () {
    const dataArr = []
    for (const key in this.collections) {
      if (this.collections.hasOwnProperty(key)) {
        const data = this.collections[key];
        dataArr.push(data)
      }
    }
    return dataArr.length ? dataArr : null
  }

  _renderLoading () {
    this.$contentList.html(this.contentItemComponent.tpl(null, null, OPT.COLLECTION_LOADING_OPT))
  }
}