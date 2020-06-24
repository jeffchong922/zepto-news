module.exports = (app) => {
  const router = require('express').Router(),
        fetch = require('node-fetch'),
        NewsDataCache = require('../data/NewsDataCache'),
        dataCache = new NewsDataCache()

  const updateInterval = 1000 * 60 * 20
  let updateDataTimestamp = 0

  router.get('/get-news', async (req, res, next) => {
    try {
      _checkDataUpdate()

      let field = req.query['field'] || 'top',
            data = dataCache.getData(field)
      
      if (!data) {
        const response = await fetch(`http://v.juhe.cn/toutiao/index?type=${field}&key=${process.env.JUHE_APPKEY}`)
        const jsonData = await response.json()
        if (!jsonData.result) {
          return res.status(404).jsonp([])
        }
        dataCache.setData(field, jsonData.result.data)
      }
      data = dataCache.getData(field)
      res.jsonp(data)
    } catch(err) {
      next(err)
    }
  })

  function _checkDataUpdate () {
    const now = +new Date()
    // 15分钟更新一次
    if ((now - updateDataTimestamp) > updateInterval) {
      dataCache.clearData()
      updateDataTimestamp = now
    }
  }

  app.use('/tt-news', router)
}