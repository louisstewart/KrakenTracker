// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const browserWindow = require('electron').remote.BrowserWindow
const ipc = require('electron').ipcRenderer
const tickerValue = document.getElementById('ticker-value-main')
const tickerDecimal = document.getElementById('ticker-decimal')
const refresh = document.getElementById('refresh')
const arrow = document.getElementById('arrow')
const update = document.getElementById('ticker-update')
const currency = document.getElementById('ticker-currency')

let apiKey = process.env.apiKey || ''
let apiSec = process.env.apiSec || ''

const kController = require('./kraken-controller.js')
const kraken = new kController(apiKey, apiSec)


refresh.addEventListener('click', () => {
    kraken.fetch(tickerify)
    refresh.classList.add('refreshing')
    setTimeout(() => {
        refresh.classList.remove('refreshing')
    }, 1000)
})

ipc.on('change', (event, currency) => {
    kraken.currency = currency
    kraken.fetch(tickerify)
    updateCurrency()
})

ipc.on('refresh', () => {
    kraken.fetch(tickerify)
})

updateCurrency()

kraken.fetch(tickerify)

setInterval(() => {
    kraken.fetch(tickerify);
}, 20000)

let tickup

function tickerify(price, prev) {
    let up = true
    let change = false
    if (price > prev) {
        up = true
        change = true
    }
    else if (price == prev) {
        up = true
        change = false
    }
    else {
        up = false
        change = true
    }

    let pre = price.split('.')[0]
    let post = '0.'+price.split('.')[1]

    post = parseFloat(post).toFixed(2)
    post = post.toString().split('.')[1]

    tickerDecimal.innerText = post
    tickerValue.innerHTML = pre + '.' + tickerDecimal.outerHTML
    tickerValue.classList.toggle('up', up)
    tickerValue.classList.toggle('down', up)
    arrow.classList.toggle('up', up)
    arrow.classList.toggle('down', up)
    arrow.classList.toggle('rotate', change)

    let now = new Date().getTime()
    update.dataset.last = now
    update.innerText = "Refreshed 0 seconds ago"

    clearInterval(tickup)
    tickup = setInterval(() => {
        let past = update.dataset.last
        let now = new Date().getTime()
        diff = (now - past) / 1000
        update.innerText = "Refreshed "+(diff - (diff % 1)) + (diff < 2 ? " second" : " seconds") + " ago"
    }, 4000)

    setTimeout(() => {
        tickerValue.classList.toggle('up', false)
        tickerValue.classList.toggle('down', false)
        arrow.classList.toggle('up', false)
        arrow.classList.toggle('down', false)
        arrow.classList.toggle('rotate', false)
    }, 500)
}

function updateCurrency() {
    let cur = kraken.currency
    let cString = cur.split('Z')
    cString[0] = cString[0].replace(/x/i, "")
    cString = cString.join(' | ')
    currency.innerText = cString
}
