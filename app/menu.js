const electron = require('electron')
const dotenv = require('dotenv').config()
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const Tray = electron.Tray


let template = [{
  label: 'Currency',
  submenu: [{
    label: 'ETH | GBP',
    accelerator: 'CmdOrCtrl+Z',
    click: function(item, focusedWindow) {app.emit('change', 'XETHZGBP')}
  }, {
    label: 'ETH | USD',
    accelerator: 'Shift+CmdOrCtrl+Z',
    click: function(item, focus) {app.emit('change', 'XETHZUSD')}
  }, {
    label: 'ETH | EUR',
    accelerator: 'CmdOrCtrl+X',
    click: function(item, focus) {app.emit('change','XETHZEUR')}
  }, {
    type: 'separator'
  },{
    label: 'BTC | GBP',
    accelerator: 'CmdOrCtrl+C',
    click: function(item, focus) {app.emit('change','XXBTZGBP')}
  }, {
    label: 'BTC | USD',
    accelerator: 'CmdOrCtrl+V',
    click: function(item, focus) {app.emit('change','XXBTZUSD')}
  }, {
    label: 'BTC | EUR',
    accelerator: 'CmdOrCtrl+A',
    click: function(item, focus) {app.emit('change','XXBTZEUR')}
  }]
}]

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
                app.quit()
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: (function () {
                if (process.platform === 'darwin') {
                    return 'Alt+Command+I'
                } else {
                    return 'Ctrl+Shift+I'
                }
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        }]
    })
}

app.on('ready', function () {
    let b = template.slice()
    const menu = Menu.buildFromTemplate(template)
    const tray = new Tray(__dirname+'/img/icon.png')
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label:"Refresh",
            click: function() {
                app.emit('refresh')
            }
        }
    ]));
    // ctxt = [
    //     {
    //         label:
    //     }
    // ]
    // tray.setContextMenu(ctxt)
    Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
