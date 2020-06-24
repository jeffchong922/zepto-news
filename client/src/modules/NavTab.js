import { getCurTarget } from '../utils/tools'

export default class NavTab {
  constructor ($, instance) {
    this.$ = $
    this.$navTab = this.$('.J_navTab')
    this.navScroll = this.$navTab.find('.nav-list-scroll')[0]
    this.$navList = this.$navTab.find('.nav-list')
    this.instance = instance
  }

  init () {
    this._scrollToActive()
    this._bindEvent()
  }

  _scrollToActive() {
    const viewWidth = window.innerWidth
    const distanceScreen = this.$navList.find('.nav-item__active')[0].getBoundingClientRect().left
    if (distanceScreen > (viewWidth / 2)) {
      const scrollLeft = this.navScroll.scrollLeft
      this.navScroll.scroll(scrollLeft + distanceScreen, 0)
    }
  }

  _bindEvent () {
    this.$navList.on('click', '.nav-item', $.proxy(this._onTabClick, this))
  }

  _onTabClick (e) {
    const target = getCurTarget(e),
          className = target.className,
          field = target.getAttribute('data-type')
    if (className === 'nav-item') {
      this._tabChange(this.$(target))
      this._contentChange(field)
    }
  }

  _tabChange ($target) {
    $target.addClass('nav-item__active')
            .siblings()
            .removeClass('nav-item__active')
  }

  _contentChange (field) {
    this.instance.setIsFromNavClick()
    this.instance.init({
      field
    })
  }
}