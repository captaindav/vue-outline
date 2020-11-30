
const express = require('express')
const http = require('http')
const puppeteer = require('puppeteer')

const port = 8090
const app = express()

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`listening on *:${port}`)
})

const options = {
  cors: true,
  origins: ["http://localhost:8080"],
}
const io = require('socket.io')(server, options)
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('login', async (msg) => {
    console.log('server login', msg)
    const data = {
      success: true,
      content: null,
    }

    const browser = await puppeteer.launch({ headless: false })
    try {
      const page = await browser.newPage()
      await page.goto("https://www.google.com");
      
      await page.type('input.gLFyf.gsfi', 'test')
      page.keyboard.press('Enter')

      await page.waitForSelector('div#resultStats')
      const links = await page.$$('div.r');
      await links[0].click()

      data.content = ''
      
    } catch (e) {
      data.success = false,
      data.content = e
    }
    await browser.close()
    
    io.emit('return_login', data)
  })
})


/*const PuppeteerService = require('puppeteer-service');
// eslint-disable-next-line no-unused-vars
const { koaApp, server } = PuppeteerService({
    cluster: false, // default: false
    port: 8090, // default
    api: 'run', // default
    test: true, // default: false
    puppeteer: {
        // See https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
        headless: false, // default
        args: ['--no-sandbox']
    }
});*/