export default class LazyLoad {
  constructor (lazyClass) {
    this.onLazyLoad = null
    this.lazyClass = lazyClass
    this.imgs = []
  }

  init () {
    this.setImgs()
    this._bindEvent()
  }

  setImgs () {
    this.imgs = document.querySelectorAll(this.lazyClass)
    this._loadImg()
  }

  _bindEvent () {
    this.onLazyLoad = this._debounce(this._loadImg, 100).bind(this)
    window.addEventListener('scroll', this.onLazyLoad, false)
  }

  _loadImg () {
    const viewHeight = window.innerHeight

    for (let i = 0; i < this.imgs.length; i++) {
      const elImg = this.imgs[i],
            screenTopOffset = elImg.getBoundingClientRect().top
      // console.log(i, screenTopOffset)
      /* 加载图片的条件：图片位置位于视口里 */
      if (screenTopOffset >= 0 && screenTopOffset <= viewHeight) {
        const tmp = new Image()
        tmp.src = elImg.getAttribute('data-src')
        tmp.onload = () => {
          elImg.setAttribute('src', tmp.src)
          elImg.classList.add('content-img__show')
          elImg.classList.remove('lazy-img')
        }
      }
    }
  }

  _debounce (fn, wait = 50, immediate = false) {
    let timeFlag
    return function (...args) {
      if (timeFlag) clearTimeout(timeFlag)

      if (immediate && !timeFlag) {
        fn.apply(this, args)
      }

      timeFlag = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }

}