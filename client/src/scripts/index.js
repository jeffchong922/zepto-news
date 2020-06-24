import '../styles/index.scss'

import header from '../components/header'
import nav from '../components/nav'
import content from '../components/content'

import NavTab from '../modules/NavTab'
import LazyLoad from '../modules/LazyLoad'
import ContentList from '../modules/ContentList'
import HeaderBar from '../modules/HeaderBar'

import IndexModel from '../models/IndexModel'

import newsNav from '../data/newsNav'

import { OPT } from '../utils/config'
;import { getQueryData } from '../utils/tools'
(($) => {
  const $app = $('#app'),
        $container = $('<div class="container">')

  const headerComponent = header(),
        navComponent = nav(),
        contentComponent = content()

  const indexModel = new IndexModel()

  let field = ''
  field = getQueryData('field') || OPT.DEFAULT_FIELD

  function init () {
    render()
    loadModules()
  }

  function render () {
    _renderHeader(OPT.INDEX_HEADER_PARAMS)
    _renderNav(newsNav, field)
    _renderContent()
    $app.append($container)
  }

  function _renderHeader (options) {
    $container.append(headerComponent.tpl(options))
  }

  function _renderNav (data, field) {
    $container.append(navComponent.tpl(data, field))
  }

  function _renderContent () {
    $container.append(contentComponent.tpl())
  }

  function loadModules () {
    const lazyLoadInstance = new LazyLoad('.lazy-img')
    lazyLoadInstance.init()

    const contentListInstance = new ContentList($, { field }, indexModel, lazyLoadInstance)
    contentListInstance.init()
    
    new NavTab($, contentListInstance).init()
    new HeaderBar($, 'index', {}).init()
  }

  init()
})(Zepto)