/*
用于生成爬虫函数，用在前端时，本模块只在编译期间运行，返回给用户已经注入好设置信息的爬虫函数
*/

const configReader = require('./configReader')

const fs = require('fs')
const _ = require('lodash')
const join = require('path').join

/**
 * 爬虫函数的返回类型
 * @typedef crawlerReturns
 * @type {Object}
 * @property {Number} solved - 用户通过的题量
 * @property {Number} submissions - 用户的总提交量
 */

/**
 * 为服务端返回的爬虫函数
 * @typedef serverCrawlerFunction
 * @type {Function}
 * @param {String} username - 要爬取的用户名
 * @returns {Promise<{crawlerReturns}>}
 */

/**
 * 为服务器端返回爬虫函数，会从config.yml读取信息，并返回一个对象
 *
 * @returns {Promise<{Object.<string, {serverCrawlerFunction}>}>}
 */
exports.generateServerCrawlerFunctions = async () => {
  const config = await configReader.ensureConfigAndRead()

  const ret = {}
  for (let item of config.crawlers) {
    if (!item.name) {
      continue
    }
    const config = {
      env: 'server',
    }
    _.assign(config, item)
    const crawlerFunc = require(`../crawlers/${item.name}.js`)
    ret[item.name] = username => crawlerFunc(config, username)
  }

  return ret
}

/**
 * 为客户端返回的爬虫函数的源代码字符串。
 * 如果爬虫是server_only的，将会返回一个带 axios 请求的函数，
 * 函数将会向服务器发起请求，让服务器进行爬取；
 * 如果爬虫不是server_only的，返回已经注入了设置信息的爬虫源代码。
 * 请注意：本函数返回的对象中不含有“函数”，只有“函数的源代码”。
 * 需要使用eval或者将源代码拼接进源码文件中使用。
 * @typedef clientCrawlerFunction
 * @type {String}
 */

/**
 * 返回给前端使用的爬虫函数，会从 config.yml 读取配置信息，装配配置信息并返回。
 * 设置了 server_only 的爬虫会返回一个 axios 的请求
 *
 * @returns {Promise<{Object.<string, {clientCrawlerFunction}>}>}
 */
exports.generateBrowserCrawlerFunctions = async () => {
  const config = await configReader.ensureConfigAndRead()

  const ret = {}
  for (let item of config.crawlers) {
    if (!item.name) {
      continue
    }
    const crawlerFuncStr = await fs.readFile(join(__dirname, `../crawlers/${item.name}.js`), 'utf-8')
    if (item.server_only) {
      ret[item.name] = `
        (username) => {
          return new Promise((resolve, reject) => {
            axios.get('/api/crawlers/${item.name}/'+username)
              .then(response => {
                // console.log(response)
                if (response.data.error) {
                  reject(response.data.message)
                } else {
                  resolve(response.data.data)
                }
              })
              .catch(err => {
                // console.error(err)
                if (err.response && err.response.data.message) {
                  // 服务端的爬虫报的错
                  reject(new Error(err.response.data.message))
                } else {
                  //网络错误或其他错误
                  reject(new Error(err.message))
                }
              })
          })
        }
      `
    } else {
      const config = {
        env: 'browser',
      }
      _.assign(config, item)
      ret[item.name] = `
        (username) => {
          let module = {exports: {}}
          ;(function(module, exports) { ${crawlerFuncStr} })(module, module.exports)
          return module.exports(${JSON.stringify(config)}, username)
        }
    `
    }
  }
  return ret
}
