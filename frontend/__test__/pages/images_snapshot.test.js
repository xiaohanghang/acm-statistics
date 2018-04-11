/* eslint-disable no-undef */

const {Nuxt, Builder} = require('nuxt')
const {resolve} = require('path')
const puppeteer = require('puppeteer')

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null
let browser = null

// Init Nuxt.js and start listening on localhost:4000
beforeAll(async () => {
  const rootDir = resolve(__dirname, '../..')
  const config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')

  // travis-ci 只能用 --no-sandbox 启动
  browser = await puppeteer.launch({args: ['--no-sandbox']})
}, 1200000) // 用两分钟的时间启动 nuxt

// const delay = ms => new Promise(r => setTimeout(r, ms))

test('frontpage', async () => {
  const page = await browser.newPage()
  await page.goto('http://localhost:4000/')
  await page.setViewport({width: 1920, height: 1080})
  const image = await page.screenshot()

  // delay(5000)

  expect(image).toMatchImageSnapshot()

}, 120000)

afterAll(async () => {
  await browser.close()
  nuxt.close()
}, 120000)
