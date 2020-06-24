import contentItem from '../components/content/item'
import bottomTip from '../components/bottom-tip'

import { getCurTarget } from '../utils/tools'
import storage from '../utils/storage'
import { OPT } from '../utils/config'

export default class ContentList {
  constructor ($, opt, model, lazyLoad) {
    this.$ = $
    this.$content = $('.J_content')
    this.$contentList = this.$content.find('.content-list')
    this.contentItemComponent = contentItem()
    this.bottomTipComponent = bottomTip()

    this.lazyLoad = lazyLoad
    this.field = opt.field || OPT.DEFAULT_FIELD
    this.pageItemLen = opt.pageItemLen || OPT.DEFAULT_PAGE_ITEM_LEN
    this.pageIndex = 0
    this.pageCount = 0
    this.model = model

    this.tipLock = false
    this.onContentScroll = null

    this.newsDataCache = {}
    this.htmlCache = {}
    this.isFromNavClick = false /* 用于判断是否从nav点击切换内容 */
  }

  init (opt) {
    this._initData(opt)
    this._initScrollTop()
    this._clearBottomTip()
    this._render()
    this._unbindEvent()
    this._bindEvent()
  }
  
  _initData (opt) {
    this.pageIndex = (opt && opt.pageIndex) || 0
    this.pageCount = (this.newsDataCache[this.field] && this.newsDataCache[this.field].length) || 0
    if (opt) {
      for (const key in opt) {
        if (this.hasOwnProperty(key)) {
          this[key] = opt[key]
        }
      }
    }
  }

  _initScrollTop () {
    window.scroll(0, 0)
  }
  
  _render () {
    this._renderLoading()
    this._renderData(this.field, this.pageItemLen, false)
  }

  _bindEvent () {
    this.onContentScroll = this._throttle(this._handleBottomTip, 100).bind(this)
    window.addEventListener('scroll', this.onContentScroll, false)

    this.$contentList.on('click', '.content-item', this.$.proxy(this._onItemClick, this))
  }
  _unbindEvent () {
    if (this.onContentScroll) {
      window.removeEventListener('scroll', this.onContentScroll)
      this.onContentScroll = null
    }
  }
  _handleBottomTip () {
    const $lastItem = this.$contentList.children('.content-item').last()
    if (!$lastItem.length) {
      // 无元素
      return
    }

    const viewHeight = window.innerHeight,
          screenBottomOffset = $lastItem[0].getBoundingClientRect().bottom
    if (screenBottomOffset - viewHeight <= 8) {
      if (this._canAppend()) {
        /* 防止多次触发 */
        if (!this._tipLockStatus()) {
          this._tipLock()
          this._renderBottomTip(true, '努力加载中')
          setTimeout(() => {
            this.pageIndex++
            this._renderData(this.field, this.pageItemLen, true)
          }, 1000)
        }
      } else {
        this._renderBottomTip(false, '已加载完所有内容')
        this._unbindEvent()
      }
    }
  }
  _canAppend () {
    return this.pageIndex < this.pageCount - 1
  }

  _onItemClick (e) {
    const target = getCurTarget(e),
          pageIndex = target.getAttribute('data-page'),
          arrayIndex = target.getAttribute('data-index'),
          newsUrl = target.getAttribute('data-url'),
          uniqueKey = target.getAttribute('data-uniquekey'),
          newsData = this.newsDataCache[this.field][pageIndex][arrayIndex]

    this._toDetailPage (newsUrl, newsData, uniqueKey)
  }
  _toDetailPage (url, data, uniqueKey) {
    storage.setItem('news-data', JSON.stringify(data), 'session')
    window.location.href = `detail.html?news_url=${url}&uniqueKey=${uniqueKey}&redirect=index&field=${this.field}`
  }

  async _renderData (field, pageItemLen, isAppend) {
    if (this.htmlCache[this.field] && this._isFromNavClick()) {
      this._clearIsFromNavClick()
      this._renderDataFromCache()
    } else {
      await this._renderDataFromNet(field, pageItemLen, isAppend)
    }
    this._afterRenderData()
  }

  async _renderDataFromNet (field, pageItemLen, isAppend) {
    const data = await this._getNewsData(field, pageItemLen)
    if (!isAppend) {
      if (data === 404) {
        this.$contentList.html(this.contentItemComponent.tpl(null, null, OPT.ERROR_LOADING_OPT))
      } else {
        this.$contentList.html(this.contentItemComponent.tpl(data, this.pageIndex, OPT.INDEX_LOADING_OPT))
      }
    } else {
      this.$contentList.append(this.contentItemComponent.tpl(data, this.pageIndex, OPT.INDEX_LOADING_OPT))
    }
    data !== 404 && this._rememberHtml()
  }

  _renderDataFromCache () {
    const contentData = this.htmlCache[this.field],
          pageIndex = contentData.pageIndex,
          pageCount = contentData.pageCount,
          strHtml = contentData.html

    this.pageIndex = pageIndex
    this.pageCount = pageCount
    this.$contentList.html(strHtml)
  }
  
  _afterRenderData () {
    this._clearBottomTip()
    this.lazyLoad.setImgs()
    this._tipUnlock()
  }

  _rememberHtml () {
    const contentHtml = this.$contentList.html(),
          cacheData = {}

    cacheData.pageIndex = this.pageIndex
    cacheData.pageCount = this.pageCount
    cacheData.html = contentHtml

    this.htmlCache[this.field] = cacheData
  }

  _renderLoading () {
    this.$contentList.html(this.contentItemComponent.tpl(null, null, OPT.INDEX_LOADING_OPT))
  }

  async _getNewsData (field, pageItemLen) {
    if (!this.newsDataCache[field]) {
      const data = await this.model.getNewsList(field, pageItemLen)
      if (data === 404) return data
      this.newsDataCache[field] = data
      this.pageCount = data.length
    }
    return this.newsDataCache[field][this.pageIndex]
  }

  _renderBottomTip (isLoading, text) {
    this.$content.append(this.bottomTipComponent.tpl(isLoading, text))
  }

  _clearBottomTip () {
    this.$content.children('.bottom-tip').remove()
  }

  _throttle (fn, wait = 50) {
    let timer = null
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args)
          timer = null
        }, wait)
      }
    }
  }

  /**
   * 底部提示文字状态
   */
  _tipLockStatus () {
    return this.tipLock
  }
  _tipLock () {
    this.tipLock = true
  }
  _tipUnlock () {
    this.tipLock = false
  }

  _isFromNavClick () {
    return this.isFromNavClick
  }
  setIsFromNavClick () {
    this.isFromNavClick = true
  }
  _clearIsFromNavClick () {
    this.isFromNavClick = false
  }
}