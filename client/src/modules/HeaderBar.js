import { getCurTarget } from "../utils/tools"
import storage from '../utils/storage'

export default class HeaderBar {
  constructor ($, name, { uniqueKey, redirect, field }) {
    this.$ = $
    this.$header = this.$('.J_header')
    this.$rightIcon = this.$header.find('.header-icon-right .iconfont')
    this.collections = JSON.parse(storage.getItem('collections')) || {}
    this.uniqueKey = uniqueKey || '' /* 用于detail页面，判断页面是否收藏*/
    this.redirect = redirect || 'index' /* 用于detail页面，判断跳转页面 */
    this.field = field || '' /* 返回index页面时定位 */
    this.htmlName = name
  }

  init () {
    this._initIcon()
    this._bindEvent()
  }

  /**
   * 只针对detail页面，用于设置文章是否收藏
   */
  _initIcon () {
    this.htmlName === 'detail' && this.uniqueKey && this._setIconStatus(this.uniqueKey)
  }
  _setIconStatus (uniqueKey) {
    const collected = Boolean(this.collections[uniqueKey])

    if (collected) {
      this.$rightIcon.addClass('collected')
    } else {
      this.$rightIcon.removeClass('collected')
    }
  }

  _bindEvent () {
    this.$header.on('click', 'a', this.$.proxy(this._onItemCLick, this))
  }

  _onItemCLick (e) {
    const target = getCurTarget(e),
          parent = target.parentNode,
          parentClass = parent.className
    
    if (parentClass === 'header-icon-right') {
      this._handleRightClick()
    } else {
      this._handleLeftClick()
    }
  }

  _handleRightClick () {
    switch (this.htmlName) {
      case 'index':
        let url = 'collection.html'
        if (this.field) url += `?field=${this.field}`
        window.location.assign(url)
        break
      case 'detail':
        this._toggleNewsColleted()
        break
      default: break
    }
  }

  _handleLeftClick () {
    switch (this.htmlName) {
      case 'collection':
      case 'detail':
        let url = this.redirect + '.html'
        if (this.field) url += `?field=${this.field}`
        window.location.assign(url)
        break
      default: break
    }
  }

  _toggleNewsColleted () {
    if (this.uniqueKey) {
      if (this.collections[this.uniqueKey]) {
        delete this.collections[this.uniqueKey]
      } else {
        this.collections[this.uniqueKey] = JSON.parse(storage.getItem('news-data', 'session'))
      }
      storage.setItem('collections', JSON.stringify(this.collections))
      this._setIconStatus(this.uniqueKey)
    }
  }
}